
let XocXoc_cuoc = require('../../../Models/XocXoc/XocXoc_cuoc');
let UserInfo    = require('../../../Models/UserInfo');
let TopVip      = require('../../../Models/VipPoint/TopVip');
let getConfig   = require('../../../Helpers/Helpers').getConfig;

module.exports = function(client, data){
	if (!!data.cuoc && !!data.box) {
		let cuoc = data.cuoc>>0;
		let box  = data.box;
		let x2 = data.x2>>0;
		let his = data.his>>0;

		if(box === "x2"){
			x2 = 1;
		}else if(box === "his"){
			his = 1;
		}

		if (client.redT.game.xocxoc.time < 2 || client.redT.game.xocxoc.time > 30) {
			client.red({xocxoc:{notice: 'Vui lòng cược ở phiên sau.!!'}});
			return;
		}
		if (x2 === 0 && his === 0 && (!(cuoc === 1000 || cuoc === 10000 || cuoc === 50000 || cuoc === 100000 || cuoc === 1000000) ||
			!(box === 'chan' || box === 'le' || box === 'red3' || box === 'red4' || box === 'white3' || box === 'white4'))) {
			client.red({mini:{XocXoc:{notice: 'Cược thất bại...'}}});
		}
		else{
			let name = client.profile.name;

			UserInfo.findOne({id:client.UID}, 'red', function(err, user){
				let xocxoc = client.redT.game.xocxoc;

				let oke = true;
				if(his === 1 || x2 === 1){
					if(xocxoc.bethis.hasOwnProperty(client.UID)){
						cuoc =  xocxoc.bethis[client.UID].totals;
						if(x2 === 1){
							cuoc = cuoc+ cuoc;
						}
						if( user.red < cuoc){
							client.red({xocxoc:{notice: 'Bạn không đủ Chip để cược.!!'}});
							oke = false;
						}
					}else{
						client.red({xocxoc:{notice: 'Không có lịch sửa ván trước.!!'}});
						oke = false;
					}
				}else if (!user || user.red < cuoc) {
					client.red({xocxoc:{notice: 'Bạn không đủ Chip để cược.!!'}});
					oke = false;
				}

				if(oke) {
					user.red -= cuoc;
					user.save();

					if (his === 1 || x2 === 1) {
						// for (let _box in xocxoc.bethis[client.UID].chips) {
						// 	for (let _cuoc in xocxoc.bethis[client.UID].chips[_box]) {
						// 		xocxoc.chip[_box][_cuoc] += parseInt(xocxoc.bethis[client.UID].chips[_box][_cuoc]);
						// 	}
						// }
					} else {
						//xocxoc.chip[box][cuoc] += 1;
					}
					let actions = [];

					if (his !== 1 && x2 !== 1) {
						if (!xocxoc.bethis.hasOwnProperty(client.UID) || xocxoc.bethis[client.UID].phien !== xocxoc.phien) {
							xocxoc.bethis[client.UID] = {
								phien: xocxoc.phien,
								betting: {uid: client.UID, name: name, phien: xocxoc.phien, time: new Date()},
								chips: {},
								totals: 0,
								x2:0,
								his:0,
							};
						}
						actions.push({cuoc: cuoc, box: box});
					} else {
						for (let box in xocxoc.bethis[client.UID].betting) {
							if(box === 'chan' || box === 'le' || box === 'red3' || box === 'red4' || box === 'white3' || box === 'white4'){
								let b = xocxoc.bethis[client.UID].betting[box];

								if(x2 === 1){
									//b = b+b;
								}

								let listBets = [1000000, 100000, 50000, 10000, 1000];
								while (b > 0) {

									for (let ii = 0; ii < listBets.length; ii++) {
										if (b >= listBets[ii]) {
											actions.push({box: box, cuoc: listBets[ii]});
											b = b - listBets[ii];
										}
									}
								}
							}
						}
						if(xocxoc.bethis[client.UID].phien !== xocxoc.phien){
							xocxoc.bethis[client.UID] = {
								phien: xocxoc.phien,
								betting: {uid: client.UID, name: name, phien: xocxoc.phien, time: new Date()},
								chips: {},
								totals: 0,
								x2:x2,
								his:his,
							};
						}
					}
					console.dir(actions);
					let func = function (checkOne,actions,cb){

						for (let i = 0; i < actions.length; i++) {
							let cuoc = actions[i].cuoc;
							let box = actions[i].box;

							if(checkOne){
								checkOne[box] += cuoc;
							}

							xocxoc.chip[box][cuoc] += 1;
							if (!xocxoc.bethis[client.UID].chips.hasOwnProperty(box)) {
								xocxoc.bethis[client.UID].chips[box] = {};
							}
							if (!xocxoc.bethis[client.UID].chips[box].hasOwnProperty(cuoc)) {
								xocxoc.bethis[client.UID].chips[box][cuoc] = 0;
							}
							xocxoc.bethis[client.UID].chips[box][cuoc] += 1;
							if (!xocxoc.bethis[client.UID].betting.hasOwnProperty(box)) {
								xocxoc.bethis[client.UID].betting[box] = 0;
							}
							xocxoc.bethis[client.UID].totals += cuoc;

							xocxoc.bethis[client.UID].betting[box] += cuoc;

							let newData = {
								'chan': 0,
								'le': 0,
								'red3': 0,
								'red4': 0,
								'white3': 0,
								'white4': 0,
							};
							newData[box] = cuoc;
							let me_cuoc = {};
							xocxoc.data.red[box] += cuoc;
							xocxoc.dataAdmin.red[box] += cuoc;

							if (xocxoc.ingame.red[name]) {
								xocxoc.ingame.red[name][box] += cuoc;
							} else {
								xocxoc.ingame.red[name] = newData;
							}
							me_cuoc.red = xocxoc.ingame.red[name];

							Object.values(xocxoc.clients).forEach(function (users) {
								if (client !== users) {
									users.red({
										xocxoc: {
											chip: {
												box: box,
												cuoc: cuoc,
												id: client.UID,
												coin: user.red
											}
										}
									});
								} else {
									users.red({
										xocxoc: {mechip: {box: box, cuoc: cuoc}, me: me_cuoc},
										user: {red: user.red}
									});
								}
							});
							let vipStatus = getConfig('topVip');
							if (!!vipStatus && vipStatus.status === true) {
								TopVip.updateOne({'name': name}, {$inc: {vip: cuoc}}).exec(function (errV, userV) {
									if (!!userV && userV.n === 0) {
										try {
											TopVip.create({'name': name, 'vip': cuoc});
										} catch (e) {
										}
									}
									//name = null;
									//cuoc = null;
								});
							} else {
								//name = null;
								//cuoc = null;
							}
							console.dir(xocxoc.bethis[client.UID]);
							//xocxoc = null;
							//	me_cuoc = null;
							//	newData = null;
							//data = null;
							//box = null;

						}
						if(checkOne)
							cb(checkOne);
					}

					XocXoc_cuoc.findOne({uid: client.UID, phien: xocxoc.phien}, function (err, checkOne) {
						name = client.profile.name;

						if (checkOne) {

							func(checkOne,actions,function(checkOne){
								checkOne.save();
							});
						} else {

							let create = {uid: client.UID, name: name, phien: xocxoc.phien, time: new Date()};
							create[actions[0].box] = actions[0].cuoc;

							XocXoc_cuoc.create(create).then(function (checkOne) {
								func(false,actions,function(checkOne){

								});
							});
						}
					});
				}
			});
		}
	}
};

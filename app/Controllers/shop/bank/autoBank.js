
var BrowserUtil = require('BrowserUtil');
var helper      = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        labelBank:   cc.Label,
		nameBank : cc.Label,	
        labelNumber: cc.Label,
        labelName:   cc.Label,
        labelBranch: cc.Label,
        buttoncoppystk: cc.Node,
		buttoncoppytentk: cc.Node,
		buttoncoppynoidungck: cc.Node,
        labelUID:   cc.Label,
        phuongthuc: cc.Label,
        //moreBank: cc.Node,
		
        scrollviewBank: {
            default: null,
            type: cc.ScrollView,
        },
        prefab: {
            default: null,
            type: cc.Prefab,
        },
        isLoad: false,
		
		note: {
			default: null,
			type: cc.RichText,
		},
       // moreHinhThuc:  cc.Node,
       // bodyNap:       cc.Node,
       // labelHinhthuc: cc.Label,
        inputTien:     cc.EditBox,
       // inputName:     cc.EditBox,
       // inputKhop:     cc.EditBox,
       // inputSTK:      cc.EditBox,
       // inputNameGo:   cc.EditBox,
        //hinhThuc:      '',
    },
    onLoad () {
        if(!this.isLoad) {
            cc.RedT.send({shop:{bank:{CodePay:true}}});
        }
        let self = this;
       // this.editboxs = [this.inputTien];
        this.keyHandle = function(t) {
            return t.keyCode === cc.macro.KEY.tab ? (self.isTop() && self.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onNapClick(),
                t.preventDefault && t.preventDefault(),
                !1) : void 0
        }
    },
    onEnable: function () {
		var magd = helper.randomString(5);
        //this.labelUID.string = 'K789'+cc.RedT.user.name;
        cc.sys.isBrowser && this.addEvent();
    },
    onDisable: function () {
       // this.moreBank.active = false;
        cc.sys.isBrowser && this.removeEvent();
       // this.clean();
    },
    addEvent: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1)
        }
    },
    removeEvent: function() {
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1)
        }
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
            case cc.macro.KEY.enter:
                this.isTop() && this.onNapClick();
        }
    },
    changeNextFocusEditBox: function() {
        for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++){
            if (BrowserUtil.checkEditBoxFocus(this.editboxs[e])) {
                BrowserUtil.focusEditBox(this.editboxs[e]);
                t = !0;
                break
            }
        }
        !t && 0 < this.editboxs.length && BrowserUtil.focusEditBox(this.editboxs[0]);
    },
    isTop: function() {
        return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active;
    },
    clean: function(){
        this.inputTien.string = '';
    },
    toggleMoreBank: function(){
        //this.moreBank.active = !this.moreBank.active;
    },
    toggleHinhThuc: function(){
        //this.moreHinhThuc.active = !this.moreHinhThuc.active;
    },
    onData: function(data){
        this.isLoad = true;
        let self = this;
        if (data.length > 0) {
            Promise.all(data.map(function(obj, index){
                let item = cc.instantiate(self.prefab);
                let componentLeft = item.getComponent('NapRed_itemOne');
                componentLeft.init(self, 'i_arg', 'labelBank')
                componentLeft.text.string = obj.bank;
                self.scrollviewBank.content.addChild(item);
                componentLeft.data = obj;
                return componentLeft;
            }))
            .then(result => {
                this['i_arg'] = result;
            })
        }
    },
    backT: function(data){
        this.labelNumber.string = data.stk;
		this.nameBank.string 	= data.type_bank;
        this.labelName.string   = data.name;
		this.labelUID.string 	= data.comment;		
		this.note.string		= `Vui lòng chuyển tiền vào số tài khoản bên trái \n Với nội dung: <color=#FA0505>${data.comment}</color>`;
        this.labelBranch.string = 'Toàn Quốc';
		this.toggleMoreBank();
		this.phuongthuc.string = 'Internet Banking';
		this.buttoncoppystk.active = true;
		this.buttoncoppytentk.active = true;
		this.buttoncoppynoidungck.active = true;
    },
    hinhThucSelect: function(event, select){
        this.hinhThuc = select;
        event.target.parent.children.forEach(function(obj){
            if (obj.name === select) {
                obj.children[0].active = true;
                this.labelHinhthuc.string = obj.children[1].getComponent(cc.Label).string;
            }else{
                obj.children[0].active = false;
            }
           // this.moreHinhThuc.active = false;
        }.bind(this));

        switch(select) {
            case '1':
                this.bodyNap.children[0].active = true;
                this.bodyNap.children[1].active = false;
                this.bodyNap.children[2].active = false;
                break;
            case '2':
                this.bodyNap.children[0].active = false;
                this.bodyNap.children[1].active = true;
                this.bodyNap.children[2].active = false;
                break;
            case '3':
                this.bodyNap.children[0].active = false;
                this.bodyNap.children[1].active = false;
                this.bodyNap.children[2].active = true;
                break;
        }
    },
    onChangerRed: function(value = 0){
        value = helper.numberWithCommas(helper.getOnlyNumberInString(value));
        this.inputTien.string = value == 0 ? "" : value;
    },
    onClickNap: function(){
    
		if (helper.isEmpty(this.inputTien.string)) {
		//let notice = cc.instantiate(cc.RedT.inGame.prefabMiniNotice);
		//let noticeComponent = notice.getComponent('mini_warning');
		//noticeComponent.text.string = 'Vui lòng nhập số tiền cần nạp!';
		//this.node.addChild(notice);
		cc.RedT.inGame.notice.show({title:"CodePay", text: 'Vui lòng điền số tiền cần nạp rồi ấn TẠO CODE !'});
		
		}else{
	
	
            let data = {
               // 'hinhthuc': this.hinhThuc,
                'type':     'bank',
                'money':    helper.getOnlyNumberInString(this.inputTien.string),
				//'name':    this.labelName.string,
				//'codegd':    this.labelUID.string,
				
            };
			cc.RedT.inGame.bgLoading.onData({active: true, text: 'Đang gửi dữ liệu...'});
            data = {'shop':{'bank':{'codepay':data}}};
            cc.RedT.send(data);
		}	
       
    },
	onCopyNumber: function(){
	cc.RedT.CopyToClipboard(this.labelNumber.string);
		let notice = cc.instantiate(cc.RedT.inGame.prefabMiniNotice);
		let noticeComponent = notice.getComponent('mini_warning');
		noticeComponent.text.string = 'Bạn đã copy số tài khoản';
		this.node.addChild(notice);
	},
	onCopyName: function(){
		cc.RedT.CopyToClipboard(this.labelName.string);
		let notice = cc.instantiate(cc.RedT.inGame.prefabMiniNotice);
		let noticeComponent = notice.getComponent('mini_warning');
		noticeComponent.text.string = 'Bạn đã copy tên tài khoản';
		this.node.addChild(notice);
	},
	onCopyBranch: function(){
		cc.RedT.CopyToClipboard(this.labelBranch.string);
		let notice = cc.instantiate(cc.RedT.inGame.prefabMiniNotice);
		let noticeComponent = notice.getComponent('mini_warning');
		noticeComponent.text.string = 'Bạn đã copy chi nhánh';
		this.node.addChild(notice);
	},
	onCopyNoiDung: function(){
		cc.RedT.CopyToClipboard(this.labelUID.string);
		let notice = cc.instantiate(cc.RedT.inGame.prefabMiniNotice);
		let noticeComponent = notice.getComponent('mini_warning');
		noticeComponent.text.string = 'Bạn đã copy nội dung chuyển khoản';
		this.node.addChild(notice);
	},	
	
});

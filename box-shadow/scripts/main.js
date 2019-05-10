var app = new Vue({
    el:'#app',
    data:{
        horizontal:'1',
        vertical:'1',
        blur:'0',
        spread:'0',
        color:{
            code:'#000000',
            toggle:false,
            r:'0',
            g:'0',
            b:'0',
            a:'1',
        },
        inset:false,
        bgColor:'#ffffff',
        bgImage:{
            toggle:false,
            upload:'images/bg.jpg'
        },
        targetCSS:{
            width: '100px',
            height: '100px',
            border: '1px solid #000',
            background:'rgba(255,255,255,0.9)'
        },
        targetImage:{
            imgFlag:false,
            upload:'images/img.png'
        }
    },
    computed: {
        rgbValue:{
            get:function(){
                const colorCode = this.color.code.slice(1);
                const hexValue = colorCode.split('');
                let r, g, b;
                if (colorCode.length === 3) {
                    r = parseInt(hexValue[0].toString() + hexValue[0].toString(), 16);
                    g = parseInt(hexValue[1].toString() + hexValue[1].toString(), 16);
                    b = parseInt(hexValue[2].toString() + hexValue[2].toString(), 16);
                } else if (colorCode.length === 6) {
                    r = parseInt(hexValue[0].toString() + hexValue[1].toString(), 16);
                    g = parseInt(hexValue[2].toString() + hexValue[3].toString(), 16);
                    b = parseInt(hexValue[4].toString() + hexValue[5].toString(), 16);
                }
                color.r = r
                color.g = g
                color.b = b
            },
            set:function(){
            }
        },
        cssColor:function(){
            if(this.color.toggle === true){
                return this.color.code
            }else{
                var colorValue = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.color.a+')'
                return colorValue
            }
        },
        targetCSSTxt:{
            get:function(){
                var stylesTxt = ''
                for(key in this.targetCSS){
                    stylesTxt += key + ':' + this.targetCSS[key] + ';\n'
                }
                return stylesTxt
            },
            set:function(val){
                var styleArr = val.split('\n')
                var styleObject = '{'
                for(var i=0;i<styleArr.length;i++){
                if(styleArr[i] === '') break
                styleArr[i] = styleArr[i].replace(":","':'").replace(";","',")
                styleObject += "'" + styleArr[i]
                }
                styleObject += '}';
                styleObject = (new Function("return " + styleObject))()
                this.targetCSS = styleObject
            }
        }
    },
    methods:{
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            this.createImage(files[0]);
        },
        // アップロードした画像を表示
        createImage(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.bgImage.upload = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        onFileChange2(e) {
            let files = e.target.files || e.dataTransfer.files;
            this.createImage2(files[0]);
        },
        // アップロードした画像を表示
        createImage2(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.targetImage.upload = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
})
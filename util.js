//电话号码校验  验证规则：区号+号码，区号以0开头，3位或4位 号码由7位或8位数字组成 区号与号码之间可以无连接符，也可以“-”连接
window.isTel = function(tel){
	var patrn = /^0\d{2,3}-?\d{7,8}$/;
                if (!patrn.test(tel)){ 
                	return false;
                }
                return true;
};
//手机号校验
window.isMobile = function(tel){
	var patrn = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/; 
     if (!patrn.test(tel)){ 
		return false; 
	} 
	return true;
};
/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 
 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                公式(1)中： 
                i----表示号码字符从由至左包括校验码在内的位置序号； 
                ai----表示第i位置上的号码字符值； 
                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

*/
//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
	
   window.IdentityCodeValid = function(code){ 
            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var tip = "";
            var pass= true;
//            if (!code || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(code)) {
//                tip = "身份证号格式错误";
//                pass = false;
//            }
            if(!code || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dx]$/i.test(code)){
                tip = "身份证号格式错误";
                pass = false;
            }
            
           else if(!city[code.substr(0,2)]){
                tip = "地址编码错误";
                pass = false;
            }
            else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17].toUpperCase()){
                        tip = "校验位错误";
                        pass =false;
                    }
                }
            }
//            if(!pass) alert(tip);
            return pass;
        }
//   获取当前时间
   window.getCurentTime = function(){
	   var now = new Date();
	      
       var year = now.getFullYear();       //年
       var month = now.getMonth() + 1;     //月
       var day = now.getDate();            //日
      
//       var hh = now.getHours();            //时
//       var mm = now.getMinutes();          //分
      
       var clock = year + "-";
      
       if(month < 10)
           clock += "0";
      
       clock += month + "-";
      
       if(day < 10)
           clock += "0";
          
       clock += day + " ";
      
       return(clock); 
   };
 //计算天数差的函数，通用  
   window.DateDiff = function(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式  
       var  aDate,  oDate1,  oDate2,  iDays  
       aDate  =  sDate1.split("-")  
       oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]) //转换为12-18-2006格式  
       aDate  =  sDate2.split("-")  
       oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])  
       iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24) //把相差的毫秒数转换为天数  
       return  iDays  ;
   } 
 //计算月份差的函数，通用  
   window.MonthDiff = function(date1 ,  date2){    //sDate1和sDate2是2006-12格式  
      // 拆分年月日
		date1 = date1.split('-');
		// 得到月数
		date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
		// 拆分年月日
		date2 = date2.split('-');
		// 得到月数
		date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
		var m = Math.abs(date1 - date2);  
       return  m  ;
   }  
 //计算季度差的函数，通用  
   window.JiDiff = function(date1 ,  date2){    //sDate1和sDate2是2006-12格式  
      // 拆分年月日
		date1 = date1.split('-');
		if(date1[1] == '01'){
			date1[1] = '03';
		}else if(date1[1] == '02'){
			date1[1] = '06';
		}else if(date1[1] == '03'){
			date1[1] = '09';
		}else if(date1[1] == '04'){
			date1[1] = '12';
		}
		// 得到月数
		date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
		// 拆分年月日
		date2 = date2.split('-');
		if(date2[1] == '01'){
			date2[1] = '01';
		}else if(date2[1] == '02'){
			date2[1] = '03';
		}else if(date2[1] == '03'){
			date2[1] = '06';
		}else if(date2[1] == '04'){
			date2[1] = '10';
		}
		// 得到月数
		date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
		var m = Math.abs(date1 - date2);
			m = m/3;
       return  m;  
   }  
      // 秒转成时分 秒 
   window.formatSeconds =function(value) { 
		var theTime = parseInt(value);// 秒 
		var theTime1 = 0;// 分 
		var theTime2 = 0;// 小时 
		// alert(theTime); 
		if(theTime > 60) { 
		theTime1 = parseInt(theTime/60); 
		theTime = parseInt(theTime%60); 
		// alert(theTime1+"-"+theTime); 
		if(theTime1 > 60) { 
		theTime2 = parseInt(theTime1/60); 
		theTime1 = parseInt(theTime1%60); 
		} 
		} 
		var result = ""+parseInt(theTime)+"秒"; 
		if(theTime1 > 0) { 
		result = ""+parseInt(theTime1)+"分"+result; 
		} 
		if(theTime2 > 0) { 
		result = ""+parseInt(theTime2)+"小时"+result; 
		} 
		return result; 
		} ;
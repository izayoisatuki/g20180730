const mysql=require('mysql');
const readlineSync = require('readline-sync');

//let animals = ['ガチャ']


const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'gacha'
});

connection.connect(); 


//let index = readlineSync.keyInSelect(animals,'何をしますか？');
console.log('0:　終了　,　1: ガチャ');
readlineSync.promptCLLoop({


1:(target,into)=>{
 console.log('ガチャするよー!');
 gachaStart();
},

0: ()=>{
 console.log('終了');
 process.exit();
  }
});








function gachaStart(){
 var saidai=0;
 var random = Math.random();
//console.log("random = "+random);
 var table_name=""; 

 if(random<0.5){
  table_name="c_character";
 }else if(random<0.8){
  table_name="r_character";
 }else if(random<0.999){
  table_name="sr_character";
 }else{
  table_name="ssr_character";
 }
//console.log("table_name = "+table_name);
 connection.query('SELECT * FROM (SELECT* FROM '+table_name+' ORDER BY id DESC) '+table_name,function(err,rows,fields){
 if(err){console.log('err: '+err);}
 saidai=rows[0].id;
//console.log("tableMax = "+rows[0].id);

 var ids=0;
 var random2=Math.random();
 for(var i=1;i<=saidai;i++){
 if(random2<i/saidai){
   ids=i;
// console.log("id = "+ids);
   break;
  }
 }

 connection.query('SELECT * FROM '+table_name+'  WHERE id = '+ids,function(err,rows,fields){
   if(err){console.log('err: '+err);}
   if(!rows[0]){console.log('naiyo');return;}

   console.log(rows[0].name+"が出たよ");
   });

 seve(rows[0].name,table_name);

//  connection.end();

 });

 function seve(c,r){
 var ch=r.split("_"); 
  connection.query('SELECT * FROM (SELECT * FROM get_character ORDER BY id DESC) get_character;',function(err,rows,fields){
// console.log(''+rows[0].id);

  connection.query("INSERT INTO get_character(id,name,rarity) VALUES("+(rows[0].id+1)+",'"+c+"','"+ch[0]+"');",function(err,result){
 if(err){console.log('err'+err);}
  console.log('get '+"INSERT INTO get_character(id,name,rarity) VALUES("+(rows[0].id+1)+",'"+c+"','"+ch[0]+"');");
  });
 });

 }

 }


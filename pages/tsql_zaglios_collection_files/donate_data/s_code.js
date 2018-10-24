// Gianluca Casati 2013-05-23
// Commento tutto il codice dell' s_code.js causa dismissione Omniture.
// Ho lanciato il comando da vim
//
//     :%s/^/\/\//
//
// quindi è rimasto tutto il codice commentato. Aggiungo solo delle funzioni "farlokke" per evitare errori JS
// e sovrascrivere le chiamate a Omniture con chiamate vuote a meno che il dominio non sia nella whitelist.
// NOTA BENE: nel file tracking_dominio.org.js dove dominio.org viene aggiunto alla whitelist, deve essere copiato in append il contenuto dell' s_code.js.

var whitelist = [ 'registrazioni.virgilio.it', 'registra.rossoalice.alice.it' ]
var domainIsInWhitelist = false;
for (var i in whitelist) {
  if (window.location.hostname == whitelist[i]) {
    domainIsInWhitelist = true;
  }
}

// A meno che il dominio non sia nella whitelist, sovrascrivo le funzioni
// che fanno chiamate ad Omniture.
if (!domainIsInWhitelist) {
  s = {};
  s.t = function () { return ''; };
  s.tl = function () { return ''; };
  s_trackPosition = function () { return false; };
  function mtx_fn_path() { return ''; };
  function mtx_fn_tp() { return ''; };
  function mtx_fn_t() { return ''; };
}

///* SiteCatalyst code version: H.22.1.
//Copyright 1996-2010 Adobe, Inc. All Rights Reserved
//More info available at http://www.omniture.com 
//*/
//
//function getOmnitureCookie(c_name){if(document.cookie.length>0){c_start=document.cookie.indexOf(c_name+"=");if(c_start!=-1){c_start=c_start+c_name.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1)c_end=document.cookie.length;return unescape(document.cookie.substring(c_start,c_end));}}return"";};
//function mtx_fn_tp(cpath){{if(typeof(cpath)!="undefined"){_path=cpath;}void(s.t());}return"";};
//function mtx_fn_t(s1){{if(typeof(s1)!="undefined"){void(s.t(s1));}else{void(s.t());}}return"";};
//function mtx_fn_path(p){if(typeof(p)!="undefined"){
//	var lre1=/(19|20)\d\d[\- \/\.](0[1-9]|1[012])[\- \/\.](0[1-9]|[12][0-9]|3[01])\/?/g;
//	var lre2=/(0[1-9]|[12][0-9]|3[01])[\- \/\.](0[1-9]|1[012])[\- \/\.](19|20)\d\d\/?/g;
//	var lre3=/(0[1-9]|1[012])[\- \/\.](0[1-9]|[12][0-9]|3[01])[\- \/\.](19|20)\d\d\/?/g;
//	if(lre1.test(p)){p=p.replace(lre1,'');}
//	if(lre2.test(p)){p=p.replace(lre2,'');}
//	if(lre3.test(p)){p=p.replace(lre3,'');}
//	return p;
//} return '';};
//function mtx_fn_clone_prop(s,mtx){var i,k;for (i=1;i<75;i++){k="prop"+i;if (mtx[k]){s[k]=mtx[k];}}};
//
//var matrix_tracking_enabled = true;
//var s_account='tivirgilioglobalpreprod';if(typeof(mtx_account)!='undefined'){s_account=mtx_account;}var s=s_gi(s_account);
//var s_linkInternalFilters='javascript:,virgilio.it';if(typeof(mtx_linkInternalFilters)!='undefined'){s_linkInternalFilters=mtx_linkInternalFilters;}
//
//var s_dlh=document.location.href;
//var _path=window.location.pathname; 
//var _hostname=window.location.hostname;
//
//
///* ************************* CONFIG SECTION ************************* */
///* You may add or alter any code config here. */
///* Link Tracking Config */
//s.trackDownloadLinks=true;
//s.trackExternalLinks=true;
//s.trackInlineStats=true;
//s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
//s.linkInternalFilters=s_linkInternalFilters;
//s.linkLeaveQueryString=true;
//s.linkTrackVars="prop57,prop58,prop59,eVar58,eVar59";
//s.linkTrackEvents="None";
//s.successfulSearchEvent='event2';
//s.searchTermVariable='eVar14';
///* Channel Manager config */ 
//s._extraSearchEngines="aport.ru|r|Aport>centrum.cz|q|Centrum>clix.pt|question|Clix>eniro.|search_word|Eniro>fireball.de|q|Fireball>hispavista.com|cadena|Hispavista>ilse.nl|search_for,SEARCH_FOR|Ilse>ixquick.|;=|Ixquick>kvasir.no>arianna.libero.it|;=,query|Libero-Ricerca;mail.ru|q|Mail.ru>starmedia.com|q|Starmedia>abcsok.no|q|Startsiden>yandex.kz|text|Yandex";
//s._channelDomain="Social Media|facebook.com,myspace.com,twitter.com,linkedin.com,wikio,netvibes.com,youtube.com>Virgilio Altro|virgilio.it";
//s._channelPattern="Display|di>Emails|em>Partnership|pa>Affiliates|af>Paid Social Media|sm>Paid Search|ps";
///* Plugin Config */
//s.usePlugins=true;
//function s_doPlugins(s){
//s.prop17=window.location.hostname;
//if(typeof(mtx_s)=="undefined"){mtx_s={};}
//if(typeof(_full)=="undefined"){_full=false;}
//if(mtx_s.channel){s.channel=mtx_s.channel;}
//if(mtx_s.pageName){s.pageName=mtx_s.pageName;}else{s.pageName='VIR:EmptyPageName:'+_hostname+':'+_path;}
//if(mtx_s.trackExternalLinks){s.trackExternalLinks=mtx_s.trackExternalLinks;}
//
//if(!mtx_s.trackBrowserPlugins){s.plugins='Not_tracked';}
//
//mtx_fn_clone_prop(s,mtx_s);
//
//if(mtx_s.path_filtered){_path=mtx_s.path_filtered;}
//s.prop57=s.pageName+":"+mtx_fn_path(_path);
//s.eVar57='D=g';
//if(mtx_s.savePageName){
///* Il fullPageName viene salvato nella prop57 nel caso in cui si tratti di
// * Virgilio Local, altrimenti viene salvato nella prop40
// */
//if(s_account=="tivirgilioglobalprod,tivirlocalprod"){s.prop57=s.pageName+":"+mtx_fn_path(_path);}
//else{s.prop40=s.pageName+":"+mtx_fn_path(_path);}
//}
//
//// Impostazioni ad hoc per la report suite di Virgilio Local
//if(s_account=="tivirgilioglobalprod,tivirlocalprod"){
//	// Memorizzo la url completa nella eVar57
//	s.eVar57='D=g';
//	// Forzo il pageName a non includere il path completo
//	_full=false;
//}
//if(_full){s.pageName=s.pageName+":"+mtx_fn_path(_path);}
//
///* Add calls to plugins here */
//s.events=s.apl(s.events,'event1',',',2)
//
///* Impostazione charset */ 
//var s_oMetaData=document.getElementsByTagName("META");
//if(s_oMetaData&&s_oMetaData.length>0){for(var i=0;i<s_oMetaData.length;i++){if(s_oMetaData[i].content.indexOf('charset=')>-1){var s_sCSet=s_oMetaData[i].content.split('=');s.charSet=s_sCSet[1];}}}else{s.charSet="UTF-8";}
//
///* Valorizzo le eVar relative al funnel della Mail */
//if(s_account=="tivirgilioglobalprod,timailservprod"){
//	if(s.pageName=='VIR:Virgilio Mail:Login'){
//		s.eVar60=s.getPreviousValue(s.pageName,"s_pv");
//	}
//	if((s.pageName=='VIR:Virgilio Mail:Inserimento dati:Ins dati statico')||(s.pageName=='VIR:Virgilio Mail:Inserimento dati:Ins dati dinamico')){ 
//		s.eVar61=s.getQueryParam('entryPoint');
//	}
//}
////Impostazione sesso
//if(s.prop32&&!s.eVar32) s.eVar32='D=c32';
////Impostazione % Scrollo HP
//s.prop36=s.getPreviousValue(s.pageName,"s_pv");
//if (s.prop36){s.prop33=s.getPercentPageViewed();}
////Impostazione canale precedente
//s.eVar37=s.getPreviousValue(s.channel,"s_pch");
////Reperimento Codici ISTAT per LOCAL -- Inserito in data 26/10/2011 - Giacomo Filidei
//if((s.prop9)&&(window.LOCAL_COMMON)){
//if(s.prop9.toLowerCase()=="local"){
//if (LOCAL_COMMON.idCity){if(!s.prop38)s.prop38=LOCAL_COMMON.idCity;if(s.prop38)s.eVar38='D=c38';}
//if(LOCAL_COMMON.idProv){if(!s.prop40)s.prop40=LOCAL_COMMON.idProv;if(s.prop40)s.eVar40='D=c40';}
//if(LOCAL_COMMON.idReg){if(!s.prop55)s.prop55=LOCAL_COMMON.idReg;if(s.prop55)s.eVar55='D=c55';}
//if(LOCAL_COMMON.istatCommerciale){if (!s.prop43)s.prop43=LOCAL_COMMON.istatCommerciale;if(s.prop43)s.eVar43='D=c43';}
//}}
///* Impostazione pmk */
//if(!s.prop19){
//s.prop19=s.getQueryParam('pmk');
///* Retrocompatibilita' HP e pmk */
//if(!s.prop19){s.prop19=s.getQueryParam('HP');}
//if(s.prop19){s.eVar19='D=c19';}
//}
///* Impostazione IE9 Pinned Icon */
//if(!s.prop41){
//s.prop41=s.getQueryParam('pinned');
//if(!s.prop41){s.prop41='None';}
//s.eVar41='D=c41';
//}
///* Impostazione idBanner Timinternet */ if(!s.prop42){s.prop42=s.getQueryParam('idBanner');if(!s.prop42){s.prop42='None';}s.eVar42='D=c42';}
///* Tracciamento traffico under login */ if(!s.prop69){s.prop69=getOmnitureCookie('tinv')||'ND';s.eVar69='D=c69';}
//if(s.prop1&&!s.eVar1){s.eVar1='D=c1';}
//if(s.prop2&&!s.eVar2){s.eVar2='D=c2';}
//if(s.prop3&&!s.eVar3){s.eVar3='D=c3';}
//if(s.prop4&&!s.eVar4){s.eVar4='D=c4';}
//if(s.pageName&&!s.eVar5){s.eVar5='D=pageName';}
//if(s.channel&&!s.eVar6){s.eVar6='D=ch';}
//if(s.prop10&&!s.eVar10){s.eVar10=s.prop10;}
//s.prop11=s.eVar11=s.getNewRepeat();
///* Campagne interne */ if(!s.eVar15){s.eVar15=s.getQueryParam('icid');}
//
//if(s.prop13&&!s.eVar26){s.eVar26=s.prop13;}
//if(s.prop14&&!s.eVar27){s.eVar27=s.prop14;}
//if(s.prop15&&!s.eVar28){s.eVar28=s.prop15;}
//if(s.prop16&&!s.eVar29){s.eVar29=s.prop16;}
//
///* Internal Search */
//if(s[s.searchTermVariable]){s[s.searchTermVariable]=s[s.searchTermVariable].toLowerCase();}
//var t_search=s.getValOnce(s[s.searchTermVariable],'ev_src',0);
//if(t_search){s.events=s.apl(s.events,s.successfulSearchEvent,',',1);}
//
//mtx_s.collectSearchKeywords = function(){
//var k=s.getQueryParam('qs');
//if(k){
///* Decode, lower case, left and right trim. Consider only the first 6 words. */
//k=unescape(k).toLowerCase().replace(/^\s+/,'').replace(/\s+$/,'').replace(/\s+/g,' ').split(' ').slice(0,6).join(' ');
//s.prop71=k;
//s.eVar71='D=c71';
//s.prop72=s.pageName;
//s.eVar72='D=c72';
//}
//};
//mtx_s.collectSearchKeywords();
//
///* Channel Manager */ 
//s.channelManager('cid',':','s_cm_VIR');
//if(s._channel){
//	/* Channel Virgilio HP = www.virgilio.it/ or /index.html */
//	var s_dr=document.referrer;
//	if(s_dr.indexOf('www.virgilio.it')>-1){
//		var s_aPath=s_dr.split('/');
//		if((s_aPath[s_aPath.length-1]==''&&s_aPath.length==4)||s_aPath[s_aPath.length-1].toLowerCase()=='index.html'){
//			s._channel='Virgilio HP';
//		}
//	}
//	s.eVar51=s._channel;
//}
//if(s._referringDomain){s.eVar52=s._referringDomain;}
//var s_tmpKeys=s._keywords?decodeURI(s._keywords).toLowerCase():'';
//if(s._campaignID){
//	if(s_tmpKeys){s.eVar53=s_tmpKeys;}//paid kwd
//} else if(s_tmpKeys){s.eVar54=s_tmpKeys;}//natural kwd
//
//	/* Tracciamento singole kwds con listProp */  
//	var s_aTmpKeys=s_tmpKeys.indexOf('%20')>-1?s_tmpKeys.split('%20'):s_tmpKeys.split(' ');
//	var s_aPreps=["di","a","da","in","con","su","per","tra","fra","nel","sul","alle","allo","agli","nella","nello","sulla","sullo","dello","della","degli","dei"];
//	var s_aArts=["i","lo","la","il","gli","le","un","uno","una"];
//	var s_aCongs=["che","come","sebbene","nonostante","comunque","se","ove","qualora","e","anche","pure","oltre","o","oppure","tuttavia","pure","senza","altrimenti","quindi","infatti","ossia"];
//	var s_aRem=[s_aPreps,s_aArts,s_aCongs];
//	for(var k in s_aRem){
//		for(var x in s_aRem[k]){
//			for(var i in s_aTmpKeys){
//				if(s_aTmpKeys[i]==s_aRem[k][x]) s_aTmpKeys.splice(i,1);
//			}
//		}
//	}
//	if(!s.prop23){s.prop23=s_aTmpKeys.length?s_aTmpKeys.join():'';}
//	if(s._campaignID){
//		s.campaign=s._campaignID;
//		s.clickPast(s.campaign,'event10','event11','cmp_CP_VIR'); /* Bounce Rate per campagne*/
//	}
//	s.clickPast(s._keywords,'event12','event13','kwd_CP_VIR'); /* Bounce Rate per kwds */
//
//	if(!s.prop24) s.prop24=s_dlh.indexOf('refresh_c')>-1?s_dlh:'';
//
///* Hierarchies */
//if(!s.hier1){if(s.channel){s.hier1=s.apl(s.hier1,s.channel,',',0);}for(var i=1;i<9;i++){if(s['prop'+i]){s.hier1=s.apl(s.hier1,s['prop'+i],',',0);}}}
//if(!s.hier2&&s.prop9&&s.prop10){s.hier2=s.prop10+','+s.prop9+','+s.hier1;}
//if(typeof(mtx_s.setHier3)=='function'){mtx_s.setHier3(s);}
//if(!s.hier3&&s.prop16){
//if(s.prop16){s.hier3=s.apl(s.hier3,s.prop16,',',0);}
//if(s.prop9){s.hier3=s.apl(s.hier3,s.prop9,',',0);}
//if(s.channel){s.hier3=s.apl(s.hier3,s.channel,',',0);}
//if(s.prop14){s.hier3=s.apl(s.hier3,s.prop14,',',0);}
//if(s.prop15){s.hier3=s.apl(s.hier3,s.prop15,',',0);}
//for(var i=1;i<9;i++){if(s['prop'+i]){s.hier3=s.apl(s.hier3,s['prop'+i],',',0);}}
//}
//s.hbx_lt="manual"
//s.setupLinkTrack("eVar49,eVar50","TI_LNK_VIR");
//};
///* Custom onClick function - Giacomo Filidei - 01/02/2012 */
//function s_trackPosition(lid,lpos){
//var s=s_gi(s_account);
//s.linkTrackVars='prop57,prop58,prop59,eVar58,eVar59';
//s.linkTrackEvents='None';
//s.prop57=s.pageName+":"+mtx_fn_path(_path);
//s.prop58=lid||'N.D.';
//s.prop59=lpos||'N.D.';
//s.eVar58=lid||'N.D.';
//s.eVar59=lpos||'N.D.';
//abs_lnk=lid+' - '+lpos;
//s.tl(this,'o',abs_lnk);
//};
//
//s.doPlugins=s_doPlugins
///************************** PLUGINS SECTION *************************/
///* You may insert any plugins you wish to use here.                 */
//
///*
// * Plugin: getPercentPageViewed v1.2
// */
//s.getPercentPageViewed=new Function("",""
//+"var s=this;if(typeof(s.linkType)=='undefined'||s.linkType=='e'){var"
//+" v=s.c_r('s_ppv');s.c_w('s_ppv',0);return v;}");
//s.getPPVCalc=new Function("",""
//+"var s=s_c_il["+s._in+"],dh=Math.max(Math.max(s.d.body.scrollHeight,"
//+"s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,s."
//+"d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s.d."
//+"documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documentE"
//+"lement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||(s"
//+".wd.document.documentElement.scrollTop||s.wd.document.body.scrollTo"
//+"p),vh=st+vph,pv=Math.round(vh/dh*100),cp=s.c_r('s_ppv');if(pv>100){"
//+"s.c_w('s_ppv','');}else if(pv>cp){s.c_w('s_ppv',pv);}");
//s.getPPVSetup=new Function("",""
//+"var s=this;if(s.wd.addEventListener){s.wd.addEventListener('load',s"
//+".getPPVCalc,false);s.wd.addEventListener('scroll',s.getPPVCalc,fals"
//+"e);s.wd.addEventListener('resize',s.getPPVCalc,false);}else if(s.wd"
//+".attachEvent){s.wd.attachEvent('onload',s.getPPVCalc);s.wd.attachEv"
//+"ent('onscroll',s.getPPVCalc);s.wd.attachEvent('onresize',s.getPPVCa"
//+"lc);}");
//s.getPPVSetup();
//
///*
// * Plugin: getPreviousValue v1.0 - return previous value of designated
// *   variable (requires split utility)
// */
//s.getPreviousValue=new Function("v","c","el",""
//+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
//+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
//+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
//+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
//+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
//
///*                                                                  
//* Plugin: clickPast - version 1.0
//*/
//s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
//+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
//+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
//+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
//+",0,0);}}}");
//s.p_fo=new Function("n",""
//+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
//+"new Object;return 1;}else {return 0;}");
///*
// * channelManager v2.4 - Tracking External Traffic
// */
//s.channelManager=new Function("a","b","c","d","e","f",""
//+"var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
//+"X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
//+"e)){v=0}if(!s.c_w(e,1,n)){s.c_w(e,1,0)}if(!s.c_r(e)){v=0}}g=s.refer"
//+"rer?s.referrer:document.referrer;g=g.toLowerCase();if(!g){h=1}i=g.i"
//+"ndexOf('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkI"
//+"nternalFilters.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<"
//+"l;m++){B=j.indexOf(k[m])==-1?'':g;if(B)O=B}if(!O&&!h){p=g;U=g.index"
//+"Of('//');q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q"
//+",r);t=t.toLowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSear"
//+"chEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g"
//+"=s.repl(g,'as_q','*')}A=s.split(S,'>');T=A.length;for(i=0;i<T;i++){"
//+"D=A[i];D=s.split(D,'|');E=s.split(D[0],',');F=E.length;for(G=0;G<F;"
//+"G++){H=j.indexOf(E[G]);if(H>-1){i=s.split(D[1],',');U=i.length;for("
//+"k=0;k<U;k++){l=s.getQueryParam(i[k],'',g);if(l){l=l.toLowerCase();M"
//+"=l;if(D[2]){u=D[2];N=D[2]}else{N=t}if(d==1){N=s.repl(N,'#',' - ');g"
//+"=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle'"
//+");}}}}}}}if(!O||f!='1'){O=s.getQueryParam(a,b);if(O){u=O;if(M){P='P"
//+"aid Search'}else{P='Paid Non-Search';}}if(!O&&M){u=N;P='Natural Sea"
//+"rch'}}if(h==1&&!O&&v==1){u=P=t=p='Direct Load'}X=M+u+t;c=c?c:'c_m';"
//+"if(c!='0'){X=s.getValOnce(X,c,0);}g=s._channelDomain;if(g&&X){k=s.s"
//+"plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
//+"it(q[1],',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i"
//+"=j.indexOf(Y);if(i>-1)P=q[0]}}}g=s._channelParameter;if(g&&X){k=s.s"
//+"plit(g,'>');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.spl"
//+"it(q[1],',');S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if"
//+"(U)P=q[0]}}}g=s._channelPattern;if(g&&X){k=s.split(g,'>');l=k.lengt"
//+"h;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.leng"
//+"th;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i."
//+"indexOf(Y);if(H==0)P=q[0]}}}if(X)M=M?M:'n/a';p=X&&p?p:'';t=X&&t?t:'"
//+"';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P=X&&P?P:'';s._re"
//+"ferrer=p;s._referringDomain=t;s._partner=N;s._campaignID=O;s._campa"
//+"ign=u;s._keywords=M;s._channel=P");
///* Top 130 - Grouped */
//s.seList="altavista.co,altavista.de|q,r|AltaVista>.aol.,suche.aolsvc"
//+".de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>www.baidu.com|wd|Baidu>daum"
//+".net,search.daum.net|q|Daum>google.,googlesyndication.com|q,as_q|Go"
//+"ogle>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor|"
//+"MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query"
//+",search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sezn"
//+"am.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query"
//+"|Tiscali>virgilio.it|qs|Virgilio>yahoo.com,yahoo.co.jp|p,va|Yahoo!>"
//+"yandex|text|Yandex.ru>search.cnn.com|query|CNN Web Search>search.ea"
//+"rthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Search>"
//+"search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Search";
///*
// * Plugin Utility: Replace v1.0
// */
//s.repl=new Function("x","o","n",""
//+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
//+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
///*
// * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
// */
//s.getNewRepeat=new Function("d","cn",""
//+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
//+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
//+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
//+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
//+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
///*
// * Plugin: getQueryParam 2.3
// * Omniture Consulting 18/06/2009: Amended to avoid using s.epa method 
// */
//s.getQueryParam = new Function("p", "d", "u", ""
//+ "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
//+ "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
//+ ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
//+ "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
//+ "=p.length?i:i+1)}return v");
//s.p_gpv = new Function("k", "u", ""
//+ "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
//+ "=s.pt(q,'&','p_gvf',k)}return v");
//s.p_gvf = new Function("t", "k", ""
//+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
//+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase()){v=s.rep("
//+ "v,'+',' '); return v;}}return ''");
///*
// * Plugin: getValOnce 0.2 - get a value once per session or number of days
// */
//s.getValOnce=new Function("v","c","e",""
//+"var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
//+")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
///*
// * Utility Function: split v1.5 (JS 1.0 compatible)
// */
//s.split=new Function("l","d",""
//+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
//+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
///*
// * Plugin Utility: apl v1.1
// */
//s.apl=new Function("l","v","d","u",""
//+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
//+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
//+"e()));}}if(!m)l=l?l+d+v:v;return l");
///*
// * Plugin: setupLinkTrack 2.0 (requires s.split and s.apl)
// */
//s.setupLinkTrack=new Function("vl","c",""
//+"var s=this;var l=s.d.links,cv,cva,vla,h,i,l,t,b,o,y,n,oc,d='';cv=s."
//+"c_r(c);if(vl&&cv!=''){cva=s.split(cv,'^^');vla=s.split(vl,',');for("
//+"x in vla)s._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}s.c_w(c,'',0);if(!s.e"
//+"o&&!s.lnk)return '';o=s.eo?s.eo:s.lnk;y=s.ot(o);n=s.oid(o);if(s.eo&"
//+"&o==s.eo){while(o&&!n&&y!='BODY'){o=o.parentElement?o.parentElement"
//+":o.parentNode;if(!o)return '';y=s.ot(o);n=s.oid(o);}for(i=0;i<4;i++"
//+")if(o.tagName)if(o.tagName.toLowerCase()!='a')if(o.tagName.toLowerC"
//+"ase()!='area')o=o.parentElement;}b=s._LN(o);o.lid=b[0];o.lpos=b[1];"
//+"if(s.hbx_lt&&s.hbx_lt!='manual'){if((o.tagName&&s._TL(o.tagName)=='"
//+"area')){if(!s._IL(o.lid)){if(o.parentNode){if(o.parentNode.name)o.l"
//+"id=o.parentNode.name;else o.lid=o.parentNode.id}}if(!s._IL(o.lpos))"
//+"o.lpos=o.coords}else{if(s._IL(o.lid)<1)o.lid=s._LS(o.lid=o.text?o.t"
//+"ext:o.innerText?o.innerText:'');if(!s._IL(o.lid)||s._II(s._TL(o.lid"
//+"),'<img')>-1){h=''+o.innerHTML;bu=s._TL(h);i=s._II(bu,'<img');if(bu"
//+"&&i>-1){eval(\"__f=/ src\s*=\s*[\'\\\"]?([^\'\\\" ]+)[\'\\\"]?/i\")"
//+";__f.exec(h);if(RegExp.$1)h=RegExp.$1}o.lid=h}}}h=o.href?o.href:'';"
//+"i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l"
//+"=s.linkName?s.linkName:s._hbxln(h);t=s.linkType?s.linkType.toLowerC"
//+"ase():s.lt(h);oc=o.onclick?''+o.onclick:'';cv=(o.lid=o.lid?o.lid:'n"
//+"o &lid')+'^^'+o.lpos;if(t&&(h||l)){cva=s.split(cv,'^^');vla=s.split"
//+"(vl,',');for(x in vla)s._hbxm(vla[x])?s[vla[x]]=cva[x]:'';}else if("
//+"!t&&oc.indexOf('.tl(')<0){s.c_w(c,cv,0);}else return ''");
//s._IL=new Function("a","var s=this;return a!='undefined'?a.length:0");
//s._II=new Function("a","b","c","var s=this;a=a.toLowerCase();return a"
//+".indexOf(b.toLowerCase(),c?c:0)");
//s._IS=new Function("a","b","c","var s=this;a=a.toLowerCase();return b"
//+">s._IL(a)?'':a.substring(b,c!=null?c:s._IL(a))");
//s._LN=new Function("a","b","c","d",""
//+"var s=this;b=a.href;b+=a.name?a.name:'';c=s._LVP(b,'lid');d=s._LVP("
//+"b,'lpos');r"
//+"eturn[c,d]");
//s._LVP=new Function("a","b","c","d","e",""
//+"var s=this;c=s._II(a,'&'+b+'=');c=c<0?s._II(a,'?'+b+'='):c;if(c>-1)"
//+"{d=s._II(a,'&',c+s._IL(b)+2);e=s._IS(a,c+s._IL(b)+2,d>-1?d:s._IL(a)"
//+");return e}return ''");
//s._LS=new Function("a",""
//+"var s=this,b,c=100,d,e,f,g;b=(s._IL(a)>c)?escape(s._IS(a,0,c)):esca"
//+"pe(a);b=s._LSP(b,'%0A','%20');b=s._LSP(b,'%0D','%20');b=s._LSP(b,'%"
//+"09','%20');c=s._IP(b,'%20');d=s._NA();e=0;for(f=0;f<s._IL(c);f++){g"
//+"=s._RP(c[f],'%20','');if(s._IL(g)>0){d[e++]=g}}b=d.join('%20');retu"
//+"rn unescape(b)");
//s._LSP=new Function("a","b","c","d","var s=this;d=s._IP(a,b);return d"
//+".join(c)");
//s._IP=new Function("a","b","var s=this;return a.split(b)");
//s._RP=new Function("a","b","c","d",""
//+"var s=this;d=s._II(a,b);if(d>-1){a=s._RP(s._IS(a,0,d)+','+s._IS(a,d"
//+"+s._IL(b),s._IL(a)),b,c)}return a");
//s._TL=new Function("a","var s=this;return a.toLowerCase()");
//s._NA=new Function("a","var s=this;return new Array(a?a:0)");
//s._hbxm=new Function("m","var s=this;return (''+m).indexOf('{')<0");
//s._hbxln=new Function("h","var s=this,n=s.linkNames;if(n)return s.pt("
//+"n,',','lnf',h);return ''");
///* WARNING: Changing any of the below variables will cause drastic
//changes to how your visitor data is collected.  Changes should only be
//made when instructed to do so by your account manager.*/
//s.visitorNamespace="telecomitalia";
//s.trackingServer="omniture.virgilio.it";
//s.trackingServerSecure="ssl-omniture.virgilio.it";
//
///************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
//var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
//+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
//+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
//+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
//+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
//+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
//+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
//+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
//+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
//+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
//+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
//+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
//+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
//+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
//+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
//+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
//+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
//+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
//+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
//+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
//+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
//+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
//+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
//+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
//+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
//+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
//+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"
//+"&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."
//+"mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"
//+"'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="
//+"='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"
//+" alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="
//+"function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"
//+";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"
//+"h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"
//+"+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"
//+"ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"
//+"inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"
//+"geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"
//+"tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="
//+"=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"
//+"')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"
//+"';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"
//+";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"
//+"!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"
//+")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"
//+"ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"
//+"!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"
//+"();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"
//+"on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"
//+"xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"
//+"')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"
//+")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"
//+"=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"
//+",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"
//+");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"
//+"s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"
//+",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"
//+"n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"
//+"ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
//+"[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"
//+".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"
//+"|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"
//+"tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"
//+")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"
//+"ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"
//+"rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"
//+"s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"
//+"l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"
//+"ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"
//+"ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"
//+";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("
//+"\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."
//+"length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"
//+"f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"
//+"dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "
//+"g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"
//+"o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"
//+"o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"
//+"cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"
//+"f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"
//+"||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"
//+"ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"
//+"l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"
//+"ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("
//+")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"
//+"t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"
//+";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"
//+"{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="
//+"screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"
//+"th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="
//+"tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"
//+"l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"
//+"t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"
//+";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"
//+",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"
//+";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"
//+";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="
//+"s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
//+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("
//+");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"
//+"Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"
//+"{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"
//+"xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
//+"n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"
//+"ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="
//+"parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="
//+"'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"
//+"fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"
//+"linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"
//+"rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"
//+",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"
//+"ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
//w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
//+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
//w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
//w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
//w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
//+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
//+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
//w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
//w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
//+"a");
//w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
//+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
//+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
//c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}
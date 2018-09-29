// fix per duplicazione chiamata a script
if (typeof xoomAdvInjectionForAdvCrashProjAlreadyDone === 'undefined') {
    xoomAdvInjectionForAdvCrashProjAlreadyDone = false;
}
(function() {
    var theHead = document.getElementsByTagName('head')[0];
    var theHtml = document.getElementsByTagName('html')[0];
    if (typeof console === 'undefined') {
        var methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
        console = {};
        for (var i = 0; i < methods.length; ++i) {
            console[methods[i]] = function() {};
        }
    }

    function getScript(url, callback) {
        var theScript = document.createElement('script');
        theScript.type = 'text/javascript';
        theScript.src = url;
        theHead.appendChild(theScript);
        if (typeof callback !== 'undefined') {
            theScript.onreadystatechange = function() {
                if (theScript.readyState == 'complete' || theScript.readyState == 'loaded') {
                    callback();
                }
            };
            theScript.onload = callback;
            console.log('[injection.js] script callback defined', callback);
        }
        console.log('[injection.js] Script injected ', url);
    }

    var cond = ( /*(location.href.indexOf('TESTADVXOOM') > 1) */ ( /*Avoid frames*/ window.self.location.href === window.top.location.href));
    if (cond && !xoomAdvInjectionForAdvCrashProjAlreadyDone && document.getElementsByTagName('body').length > 0 && document.getElementsByTagName('head').length > 0) {
        var theBody = document.getElementsByTagName('body')[0];
        //			console.log(theBody.className);  stili sul body    logged-in   not-logged-in
        // 			block-sp_bus-0  id da tirare su   con top:0


        //crea tag style nell'head, imposta regole base
        theStyle = document.createElement('style');
        theStyle.innerHTML = "html{positione:relative; height:100%;}body{min-height:100%;}";
        theHead.appendChild(theStyle);

	    function injectCookiePolicy() {
	        try {
	            var cookiePolicyDivId = 'iolCookiePolicy';
	            var cookiePolicyDiv = document.getElementById(cookiePolicyDivId);
	            if (typeof cookiePolicyDiv === 'undefined' || (typeof cookiePolicyDiv !== 'undefined' && !cookiePolicyDiv)) {
	            	theStyle.innerHTML = theStyle.innerHTML+'body{margin-bottom:18px; } #iolCookiePolicy {position:fixed; z-index: 100000; left:0; right:0; bottom:0; height:18px; box-sizing:border-box; background: #86B53E; color: #FFF; font: 9px/18px Arial,Helvetica,sans-serif; padding: 0 10%; text-align: center; } #iolCookiePolicy>a {color: #FFF; font-weight:700; text-transform:uppercase; }';

	                cookiePolicyDiv = document.createElement('div');
	                cookiePolicyDiv.id = cookiePolicyDivId;
	                cookiePolicyDiv.innerHTML = '<a href="http://privacy.italiaonline.it/common/cookie/privacy_detail.php" target="_blank">Cookie policy</a>';

	                theBody.appendChild(cookiePolicyDiv);

	            } else {
	                console.log('[injection.js] Div is already here', cookiePolicyDiv, typeof cookiePolicyDiv);
	            }
	            getScript('http://i.plug.it/common/tech_includes/lib/policy_cookie.js');

	            console.info('[injection.js] leaderboard injected');
	        } catch (e) {
	            console.error(e);
	        }
	    }
        function pushTag() {
            if (typeof IOLAdv !== 'undefined' && typeof IOLAdv.Adv.advlib.isThereASlotForThisDiv !== 'undefined') {
                console.log('[injection.js] pushing tag!');
                if (IOLAdv.Adv.advlib.isThereASlotForThisDiv('ad97090')) {
                    console.log('[injection.js] Pushing adv');
                    IOLAdv.Adv.advlib.slotDetails[0].dims = [IOLAdv.Adv.advlib.slotDetails[0].dims[0]]; // removing wallpaper  
                    googletag.cmd.push(function() {
                        googletag.display('ad97090');
                    });
                    console.log('[injection.js] Pushed ', IOLAdv);
                }
            } else {
                console.error('[injection.js] dfp scripts missing! no adv can be displayed');
            }
        }
        function injectBanner() {
            try {
                console.info('[injection.js] Start injecting leaderboard');
                var injectBannerDivId = 'ad97090';
                var injectBannerDiv = document.getElementById(injectBannerDivId);
                if (typeof injectBannerDiv === 'undefined' || (typeof injectBannerDiv !== 'undefined' && !injectBannerDiv)) {
                	theStyle.innerHTML = theStyle.innerHTML+'html{margin-top:110px;padding-top:0;} #' + injectBannerDivId + '{position:relative;width:728px;height:90px;margin:-100px auto 10px;text-align:center;} #' + injectBannerDivId + ' iframe{width:728px;height:90px;}';

                    injectBannerDiv = document.createElement('div');
                    injectBannerDiv.id = injectBannerDivId;
                    theBody.appendChild(injectBannerDiv);
                    theBody.insertBefore(injectBannerDiv, theBody.firstChild);

                    console.log('[injection.js] Div injected');
                    
                } else {
                    console.log('[injection.js] Div is already here', injectBannerDiv, typeof injectBannerDiv);
                }
                getScript('http://i.plug.it/banners/js/rta.js');
                getScript('http://i.plug.it/banners/js/adv_library3.js', function() {
                    getScript('http://virgiliopeople.plug.it/webspace/html/js/misc/dfp.js', pushTag);
                });
                console.info('[injection.js] leaderboard injected');
            } catch (e) {
                console.error(e);
            }
        }
        var url;
        var webId;
        var theLocation = location.href;
        if (theLocation.indexOf('xoomer.virgilio.it') >= 0) {
            url = 'http://i.plug.it/iplug/js/lib/mtx/xoom/filtered/xoomer/';
            webId = theLocation.substring(26);
            var pos = webId.indexOf('/');
            if (pos > 0) {
                webId = webId.substring(0, pos);
            }
        } else if (theLocation.indexOf('members.xoom.it') >= 0) {
            url = 'http://i.plug.it/iplug/js/lib/mtx/xoom/filtered/member/';
            webId = theLocation.substring(23);
            var pos = webId.indexOf('/');
            if (pos > 0) {
                webId = webId.substring(0, pos);
            }
        } else {
            url = 'http://i.plug.it/iplug/js/lib/mtx/xoom/filtered/xoom/';
            webId = theLocation.substring(7, theLocation.indexOf('.xoom.it'));
        }
        if (webId.length >= 4) {
            url += webId.substring(0, 2) + '/' + webId.substring(2, 4) + '/' + webId + '.png';
        } else if (webId.length >= 2) {
            url += webId.substring(0, 2) + '/' + webId + '.png';
        }
        var oImg = document.createElement("img");
        oImg.onload = function() {
            console.log('webId filtered - no banner will be displayed');
        };
        injectCookiePolicy();
        oImg.onerror = injectBanner;
        oImg.setAttribute('src', url);
    }
}());
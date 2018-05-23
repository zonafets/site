function check_frame() 
{
	var frame_size=0, window_size=0;
	var ref_weight=.30; 
	var rel_weight=0;
	var current_win=this.window;
	var parent_win=current_win.parent;
	var tryvar;

	while (parent_win!=current_win) 
	{
		if ((document.getElementById)&&(!document.all)) 
		{ 
			eval("try {tryvar=parent_win.innerWidth} catch (tryvar) {parent_win=current_win}")
		} 
		else 
		{ 
			if (typeof(parent_win.document)!="object") 
			{
				parent_win=current_win;
			} 
		} 
		if (parent_win!=current_win) 
		{
			current_win=parent_win; 
			parent_win=current_win.parent
		}
	}


	if (current_win.innerWidth) 
	{
		//calcoliamo la grandezza del frame corrente
		frame_size=current_win.innerWidth*current_win.innerHeight;

		//calcoliamo la grandezza dell'intera finestra
		window_size=window.innerWidth*window.innerHeight;
	} 
	else if ((current_win.document) && (current_win.document.body)) 
	{

		if (current_win.document.body.offsetWidth) 
		{
			//calcoliamo la grandezza del frame corrente 
			frame_size=current_win.document.body.offsetWidth*current_win.document.body.offsetHeight;

			//calcoliamo la grandezza dell'intera finestra
			if (window.document.body) 
			{
				window_size=window.document.body.offsetWidth*window.document.body.offsetHeight;
			}
		} 
		else 
		{
			return 1;
		}
	} 
	else 
	{
		return 1;
	}


	if (!frame_size) 
	{
		return 1;
	}

	//calcoliamo il peso relativo del frame
	rel_weight=window_size/frame_size;
	//document.write ("reference weight: ", ref_weight , "<br>");
	//document.write ("relative weight: ", rel_weight , "<br>");

	//confrontiamolo con il peso di riferimento
	if (rel_weight>ref_weight) 
	{
		return 1;
	}
	return 0;

	// fine check_frame
}




//main

if (!window.top) 
{
	check_rs_frame=1;
}
else if (!window.top.frames) 
{
	check_rs_frame=1;
}
else if ((window==window.top)&&(window.top.frames.length==0)) 
{
	check_rs_frame=1;
}
else if ((window!=window.top)||(window.top.frames.length>0)) 
{
	//document.write ("frame number: ",window.top.frames.length,"<br>");

	//eseguiamo il controllo sul frame
	check_rs_frame=check_frame();

	if (document.body) if (document.body.innerHTML) 
	{
		var d=document.body.innerHTML.toLowerCase();

		if (window.frames.length>=1) 
		{
			if ((check_rs_frame==1)&&(d.indexOf("<iframe")>=0)) 
			{
				check_rs_frame=1;
			}	
			else 
			{
				check_rs_frame=0;
			}
		}
	}
} 
else 
{
	check_rs_frame=1;
}


// se non dobbiamo prendere in considerazione alcuni path controlliamo window.location.pathname.indexOf .....
// if (window.location.pathname.indexOf("/ricerca_path/")==0) check_rs_frame=0;

for (imgval=0; imgval<document.images.length; imgval++) 
{
	if (document.images[imgval].src) 
	{
		if (document.images[imgval].src.indexOf("http://server-it.imrworldwide.com/cgi-bin/count?")==0) 
		{
			check_rs_frame=0;
		}
	}
}

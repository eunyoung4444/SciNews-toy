// variables
 $(document).ready(function(){
    // Insert body text, reconstruct <p> structure
    var body=document.getElementById("text")
    var bodySents=body.innerText.split("<sent>").filter(function(entry){ return entry.trim() !='';});
    var bodySentsClean=[];
    for (var i=0;i<bodySents.length;i++){
        var newsent=bodySents[i].split("</sent>").filter(function(entry){ return entry.trim() !='';});
        bodySentsClean.push(newsent[0]);
    }
    body.removeChild(body.childNodes[0]);
    for (var i=0;i<bodySentsClean.length;i++){
        if(bodySentsClean[i]=="<br>"){
            asent=document.createElement("br");
            body.appendChild(asent)
            asent=document.createElement("br");
            body.appendChild(asent)
        }
        else{
            if(bodySentsClean[i].startsWith(" ")){
                var asent=document.createElement("SENT");
                asent.classList.add('normal');
                asent.appendChild(document.createTextNode(bodySentsClean[i].substring(1,)));
                body.appendChild(asent);
                var space=document.createTextNode(" ");
                body.insertBefore(space, asent);
            }
            else{
            var asent=document.createElement("SENT");
            asent.classList.add('normal');
            asent.appendChild(document.createTextNode(bodySentsClean[i]));
            body.appendChild(asent);
        }}
    }
    // Give id to each sentence 
    sents=document.getElementById("text").getElementsByTagName("sent");
    for (var i=0;i<sents.length;i++){
        thissent=sents[i];
        thissent.setAttribute("id","sent"+i.toString());
        $("#sent"+i.toString()).on({
            mouseenter: function(){
            if(thissent.classList.contains('selectable')){
//                this.setAttribute('style', 'backgroundColor:#FCF3CF !important');
                this.style.backgroundColor="#FCF3CF";
            }},
            mouseleave: function(){
                if(thissent.classList.contains('selectable')){
                    this.style.backgroundColor="transparent";
                 }
            }
        });
        $("#sent"+i.toString()).click(function(){
            if(this.classList.contains('curselected')){
                this.classList.remove("curselected");
                this.classList.add("selectable");
            }else{
                if(this.classList.contains('selectable')){
                this.classList.replace("selectable","curselected");
            }}
            // Enable or Disable Next button
            if(document.getElementsByClassName("curselected").length>0){
                if($("#SelectStage").length>0){
                    $("#SelectStage")[0].disabled=false;}
                else{
                    if($("#FindStage").length>0){
                        $("#FindStage")[0].disabled=false;
                    }
                }
            }else{
                if($("#SelectStage").length>0){
                    $("#SelectStage")[0].disabled=true;}
                else{
                    if($("#FindStage").length>0){
                        $("#FindStage")[0].disabled=true;
                    }
                }
            }
        });
    }
    body.style.display="inline";
 
    // jQuery AJAX set up
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
  

    // Click Exclamation button Highlight some important text and then click the exclamation button to generate some quizz
    $('#addEbutton').popover({
        html:true,
        content:'<div class "popoverrow" style="float:right"><button class="btn" id="popoverclose" onclick="popoverclose()" ><i class="fa fa-times" style="color:grey"></i></button></div><div class="popoverrow">Select one or more sentences with important/useful information.</div><div class="popoverrow"><button class="btn" id="SelectStage" type="button" style="float: right;" disabled="true"; onclick="AfterSelection()">Next</button></div>',
        placement:'right',
    }).on('shown.bs.popover', function(){
        $('#Q_input').focus();
        var sentences=document.getElementsByTagName("sent");
        for (var i =0;i<sentences.length;i++){
            sentence=sentences[i];
            sentence.classList.add('selectable')
        }
        document.getElementById("addbuttons").classList.add('fixedbutton')  
    })
    $('#addEbutton').tooltip({
        placement: 'right',
        title: 'Click to make a quiz question.',
        animation: true,
        delay: {show:200, hide:10}
    })
    $('#addEbutton').click(function(){
        $(this).tooltip('hide'); 
            //// ref button update, save input value
    });
    //Text select text and add it as a reference.
    var sentences=document.getElementsByTagName("sent");
    for (var i =0;i<sentences.length;i++){
        sentence=sentences[i];
//        sentence.addEventListener
    }
/*     .onmouseup = function() {
        //// do something only if one add ref popover is open 
        if(document.getElementById("ref_input")){
            var currefinput=document.getElementById("ref_input");
            var parentButton=currefinput.parentElement.parentElement.parentElement.parentElement.previousSibling;
            var refstat=$(parentButton).find("#refstatus");
            var refno=parentButton.id.substring(6);
            snapSelectionToWord(currefinput, refno);
            ////// reset the selection         
        }
        else{
            snapSelectToQuestion();
        }} */
        reconSidebar();

        
}); 

function popoverclose(){
    $('#addEbutton').popover('hide');
    var sentences=document.getElementsByTagName("sent");
        for (var i =0;i<sentences.length;i++){
            sentence=sentences[i];
            sentence.classList.remove('selectable');
            if(sentence.classList.contains('curselected')){
                sentence.classList.remove('curselected');
            }
        }
    document.getElementById("addbuttons").classList.remove('fixedbutton');    

}

// End of document ready clause 
// Move addbuttons along with mouse
$(document).on('mousemove', function(e){
    e.preventDefault();
   mousey=e.pageY
     texttop=document.getElementById('text').offsetTop;
    textheight=document.getElementById('text').offsetHeight;
    addbuttons=document.getElementById("addbuttons");
    if(addbuttons.classList.contains('fixedbutton')){}
    else{
    buttontop=0;
    topmargin=document.getElementById("top-margin").offsetHeight;
    realtexttop=topmargin+texttop;
    if(mousey<realtexttop){
        buttontop=0;
    }else{
        if(mousey>realtexttop+textheight){
            buttontop=textheight;
        }else{
            buttontop=Math.floor((mousey-realtexttop)/100)*100
            }
        }
    addbuttons.style.top=buttontop.toString()+"px";
}})

function reconSidebar(){
 //Floating sidebar
    var topPosition = $("#floating-div").offset().top - 10;
    var parentwidth = $('#sidebar-container').width();
    var floatingDiv = $('#floating-div')[0];
    window.onresize = function(){
    parentwidth=$('#sidebar-container').width();
    floatingDiv.style.width=parentwidth.toString()+"px"    
    }
    floatingDiv.style.width=parentwidth.toString()+"px"    
    var floatingDivHeight = $('#floating-div').outerHeight();
    var footerFromTop = $('#footer').offset().top;
    var absPosition = footerFromTop - floatingDivHeight - 20;
    var win = $(window);
    win.scroll(function() {
        if ((win.scrollTop() > topPosition) && (win.scrollTop() < absPosition)) {
        floatingDiv.style.position="fixed";
        floatingDiv.style.width=parentwidth.toString()+"px";
        } else if ((win.scrollTop() > topPosition) && (win.scrollTop() > absPosition)) {
        floatingDiv.style.position="absolute";
        floatingDiv.style.width=parentwidth.toString()+"px";
        } else {
        floatingDiv.style.position=""
        floatingDiv.style.width=parentwidth.toString()+"px";
        }
   });
} // end of sidebar reconstruction 
    window.addEventListener('scroll', function(e){})


function AfterSelection(){
    console.log("Hiiii");
    popoverbody=document.getElementsByClassName("popover-body")[0];
    popoverprompt=popoverbody.childNodes[1];
    popoverbuttonholder=popoverbody.childNodes[2]
    originalwidth=popoverprompt.clientWidth;
    popoverprompt.style.width=originalwidth.toString()+"px";
    popoverprompt.innerHTML="Make a question that can be answered by the selected sentence(s)."
    // insert input box
    
    newQanswered=document.createElement("input");
    newQanswered.setAttribute('type', 'text');
    newQanswered.setAttribute('id', 'possibleQ');
    newQanswered.setAttribute('style', 'width:75%');
    popoverbuttonholder.removeChild(popoverbuttonholder.firstChild);
    popoverbuttonholder.appendChild(newQanswered);
    newQansAdd=document.createElement("button");
    newQansAdd.setAttribute('class', 'btn');
    newQansAdd.setAttribute('id', 'newQansAdd');
    newQansAdd.setAttribute('style', 'float: right;');
    newQansAdd.setAttribute('onclick', 'SubmitQWithA()');
    newQansAdd.innerHTML="Add";
    popoverbuttonholder.appendChild(newQansAdd);
    newQanswered.addEventListener("keyup", function(event){
        event.preventDefault();
        if(event.keyCode===13){
            newQansAdd.click();
        }
    })
}

function SubmitQWithA(){
    possiblequestion=document.getElementById("possibleQ").value;
    if(possiblequestion.length>2){
        var questholder=document.getElementById("generated_quiz");
        curlen=questholder.childNodes.length-1;
        newQholder=document.createElement("div");
        newQholder.className="card";
        newQholder.style.width="100%";
        newQ=document.createElement("div");
        newQ.className="row qrow";
        newQdelete=document.createElement("div");
        newQdelete.setAttribute("class","col-1 deleteholder")
        newQdeletebutton=document.createElement("button");
        newQdeletebutton.setAttribute("class","btn deletebutton");
        newQdeletebutton.innerHTML='<i class="fa fa-times-circle"></i>';

        newQdeletebutton.addEventListener("click", function(){
            var questholder=document.getElementById("questions_generated");
            questholder.removeChild(this.parentElement.parentElement.parentElement);
            document.getElementById("qnumtotal").innerHTML=questholder.childNodes.length;   
            showbutton=document.getElementById("showless");
            if((questholder.childNodes.length<8)&&(questholder.childNodes.length>1)){
                $("#submitQuizbutton")[0].disabled=true;
                $("#submitQuizbutton")[0].style.backgroundColor="white";
                $("#submitQuizbutton")[0].style.color="black";            
                }
        });

        newQdelete.appendChild(newQdeletebutton);

    
        newQtext=document.createElement("div");
        newQtext.setAttribute("class","qlist col-11");
        newQtext.innerHTML=possiblequestion;
    
        newQ.appendChild(newQtext);
        newQ.appendChild(newQdelete);
        newQholder.appendChild(newQ);
        questholder.appendChild(newQholder);

        document.getElementById("qnumtotal").innerHTML=questholder.childNodes.length;
        if(questholder.childNodes.length>2){
            $("#submitQuizbutton")[0].disabled=false;
            $("#submitQuizbutton")[0].style.backgroundColor="#009e08";
            $("#submitQuizbutton")[0].style.color="white";   
        }

        selectedTexts=document.getElementsByClassName("curselected");
        refsentids=[];
        for (var i=0;i<selectedTexts.length;i++){
            selectedText=selectedTexts[i];
            selectedid=selectedText.id;
            refsentids.push(selectedid);
        }
        for (var i =0;i<refsentids.length;i++){
            selectedText=document.getElementById(refsentids[i]);
            selectedText.classList.replace("curselected", "prevselected");
        }
        newQholder.setAttribute('dataref',refsentids);
        $('#addEbutton').popover('hide');
        // remove 'selectable' class for other
        selectableSents=document.getElementsByClassName('selectable');
        len=selectableSents.length
        var i=0;
        while (i<len) {
            selectableSent = selectableSents[0]
            selectableSent.classList.remove('selectable');
            i++;
        }
        document.getElementById("addbuttons").classList.remove('fixedbutton');    
    }
    else{
        document.getElementById("possibleQ").value='';
    };
};

function submitQuiz(){
    var question_generated=document.getElementById("generated_quiz");
    var question_holders=question_generated.getElementsByClassName("card");
    var articleno=Number(document.getElementById("ano").innerText);
    var madeby=document.getElementById('username').innerText;
    console.log(question_holders.length);
    for (var i=0;i<question_holders.length;i++){
        var aquestion=question_holders[i].firstChild.firstChild.innerText;   
        var refsentids=question_holders[i].getAttribute('dataref');
        console.log(refsentids);
        $.ajax({
            url: 'addquestionwithref',
            method: 'POST',
            data:{'text':aquestion, 'articleno':articleno, 'madeby':madeby, 'madeat':"quizcol", 'refsentids':refsentids}
        });
    }
    window.location.replace('quiz');
}

/* // 
function selectToQuestion() {
        var selectionText = "";
        if (document.getSelection) {
            selectionText = document.getSelection();
            selectionRange= selectionText.getRangeAt(0);
        } else if (document.selection) {
            selectionText = document.selection.createRange().text;
        }
        if(selectionText){
            $('#addEbutton')[0].disabled=false;
        }
}
        
function snapSelectToQuestion() {
        var sel;
        // Check for existence of window.getSelection() and that it has a
        // modify() method. IE 9 has both selection APIs but no modify() method.
        if (window.getSelection && (sel = window.getSelection()).modify) {
            sel = window.getSelection();
            if (!sel.isCollapsed) {
    
                // Detect if selection is backwards
                var range = document.createRange();
                range.setStart(sel.anchorNode, sel.anchorOffset);
                range.setEnd(sel.focusNode, sel.focusOffset);
                var backwards = range.collapsed;
                range.detach();
    
                // modify() works on the focus of the selection
                var endNode = sel.focusNode, endOffset = sel.focusOffset;
                sel.collapse(sel.anchorNode, sel.anchorOffset);
                
                var direction = [];
                if (backwards) {
                    direction = ['backward', 'forward'];
                } else {
                    direction = ['forward', 'backward'];
                }
    
                sel.modify("move", direction[0], "character");
                sel.modify("move", direction[1], "word");
                sel.extend(endNode, endOffset);
                sel.modify("extend", direction[1], "character");
                sel.modify("extend", direction[0], "word");
            }
        } else if ( (sel = document.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            if (textRange.text) {
                textRange.expand("word");
                // Move the end back to not include the word's trailing space(s),
                // if necessary
                while(/\s$/.text(textRange.text)){
                    textRange.moveEnd("character",-1);}
                    textRange.select();
                }}
            selectToQuestion();
} */
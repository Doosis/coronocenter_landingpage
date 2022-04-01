// Variables 
var lang = window.navigator.language || window.navigator.userLanguage, // Check the Browser language
translate; // Container of all translations

// Update language dropdown
if (lang === 'en') {
    let element = document.getElementById('language');
    element.value = 'English';
}
else if(lang === 'de'){
    let element = document.getElementById('language');
    element.value = 'Deutsch';
}
else {
    let element = document.getElementById('language');
    element.value = 'English';
} 


startTranslation();

function startTranslation(){
    // Call translations json file and populate translate variable  
    $.getJSON("translate-plugin/translations.json", function(texts) {

        translate=texts;

        // Translations Function: Get all the element with data-text
        $("[data-translate]").each(function() {
            let text= $(this).attr('data-translate'), // Save the Text into the variable
                numbers= text.match(/\d+/g),
                element=  $('[data-translate="'+text+'"]'),
                postHTML;

            if (numbers != null && numbers>1) 
                    text= text.replace(numbers, '%n');
            
            if (translate[text]!==undefined) { // Check if exist the text in translation.json                      

                if (translate[text][lang]!==undefined) { // Check if exist the text in the browser language
                    postHTML= translate[text][lang];
                } else { // If not exist the lang, show the text in primary Language (Recomend: English)
                    postHTML= text;
                }

                if (numbers != null && numbers>1) 
                    postHTML= postHTML.replace('%n', numbers);

                element.html(postHTML);

            } else {
                //$('[data-translate="'+text+'"]').html("ERR").css({'color':'red','font-weight':'bold'});
                $('[data-translate="'+text+'"]').html(text).css({'color':'red','font-weight':'bold'});
            }
        });
    });
}

function toggleLanguage(language) {
    if (language === "English") {
        lang = 'en';
    }
    else if(language === "Deutsch"){
        lang = 'de';
    }
    else {
        lang = 'en';
    } 
    
    startTranslation();
}


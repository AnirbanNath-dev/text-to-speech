const textarea = document.querySelector('textarea')
const voiceList = document.querySelector('select')
const btn = document.querySelector('.btn')

let isSpeaking = true;
const voices = ()=>{
    for(let voice of speechSynthesis.getVoices()){
        let selected = voice.name  === 'Google US English'?'selected':''
        console.log(voice);
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML('beforeend',option);
    }
}
speechSynthesis.addEventListener('voiceschanged',voices)
const textToSpeech = (text) =>{
    console.log('clicked')
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of speechSynthesis.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    speechSynthesis.speak(utterance);
}

btn.addEventListener('click', (e) =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!speechSynthesis.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 100 ){
            if(isSpeaking){
                speechSynthesis.resume();
                isSpeaking = false;
                btn.innerText = 'Pause Speech';
            }
            else{
                speechSynthesis.pause();
                isSpeaking = true;
                btn.innerText = 'Resume'
            }
            
            setInterval(() => {
                if(!speechSynthesis.speaking && !isSpeaking){
                    isSpeaking = true;
                    btn.innerText = 'Convert to Speech';
                }
            });
        }else{
            btn.innerText = 'Convert to Speech';
        }
    }
})
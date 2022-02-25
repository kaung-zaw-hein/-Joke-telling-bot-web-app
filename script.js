
Vue.createApp({
    data() {
      return {
          apikey:"https://v2.jokeapi.dev/joke/Any?type=twopart",
          setup: 'Just Click and Start Laughing',
          delivery: '',
          next:false,
          synth: window.speechSynthesis,
          isLoading: true,
          selectedVoice: 0,
          voiceList: [],
          greetingSpeech: new window.SpeechSynthesisUtterance()
      }
    },
    mounted(){
        // wait for voices to load
   this.voiceList = this.synth.getVoices()

   if (this.voiceList.length) {
    this.isLoading = false;
  }

   this.synth.onvoiceschanged = () => {
     this.voiceList = this.synth.getVoices()
     this.isLoading = false;
   }
   },
    methods: {
        async search(){
            if(!this.next){
                try{
                    let {data} = await axios(this.apikey)
                    let { setup, delivery }  = data;
                    this.setup = setup;
                    this.delivery = delivery;
                    this.next = true;
                    this.shout(this.setup);
                }
                catch(error){   
                    this.setup = "error 404";
                    console.log(error);
                }
            }else{
                this.next= false;
                this.shout(this.delivery);
            }
        },
      
      shout (text) {
        this.greetingSpeech.text = text;
  
        this.greetingSpeech.voice = this.voiceList[this.selectedVoice]
        
        
        this.synth.speak(this.greetingSpeech)
      }
    },
  }).mount('#app')
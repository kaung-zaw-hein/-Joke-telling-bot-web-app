
Vue.createApp({
    data() {
      return {
          apikey:"https://v2.jokeapi.dev/joke/Any?type=twopart",
          setup: 'Just Click and Start Laughing',
          delivery: '',
          next:false,
          synth: window.speechSynthesis,
          voices:[],
          vic:[],
      }
    },
    computed: {
        
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
                }
                catch(error){   
                    this.setup = "error 404";
                    console.log(error);
                }
            }else{
                this.next= false;
            }
        },
        showVoices(){
            console.log("a");
            let vic = speechSynthesis.getVoices()
            vic.map((v,i)=>{
                
                let voice = {
                    value:  i,
                    name:v.name
                }
                this.voices.push(voice);
                console.log(this.voices);
            })
        }
    },
    mounted(){
        this.showVoices();
        this.vic = this.synth.getVoices()
        console.log(this.vic);
        // this.synth.onvoiceschanged = () => {
        //     this.voiceList = this.synth.getVoices()
        //     // give a bit of delay to show loading screen
        //     // just for the sake of it, I suppose. Not the best reason
        //     setTimeout(() => {
        //       this.isLoading = false
        //     }, 800)
        //   }
      
        //   this.listenForSpeechEvents()
    }
  }).mount('#app')
<template>
    <div id="home">
        <main-page>
            <template v-for="v in videos">
                <video preload="metadata" :ref="'video-' + v.value" v-show="video === v.value" :key="v.value" :src="require('../assets/videos/' + v.value +'.webm')" muted></video>
            </template>
        </main-page>
        <div class="menu">
            <b-radio-group buttons v-model="video" :options="videos"></b-radio-group>

            <audio class="mx-3" ref="audio" :src="require('../assets/audio/audio.mp3')" controls></audio>

            <b-btn class="float-right mt-2" @click="toggleFullscreen"><i class="fas fa-expand-wide"></i></b-btn>
        </div>
    </div>
</template>

<script>
    import MainPage from "../components/main-page";

    export default {
        name: "home",
        components: {MainPage},
        data() {
            return {
                time: 0,
                video: 'percussions',
                playing: false,
                videos: [
                    { text: 'Clarinettes', value: 'clarinettes' },
                    { text: 'Cors', value: 'cors' },
                    { text: 'Flutes', value: 'flutes' },
                    { text: 'Percussions', value: 'percussions' },
                    { text: 'Sax', value: 'sax' },
                    { text: 'Solistes', value: 'solistes' },
                    { text: 'Trombones', value: 'trombones' },
                    { text: 'Trompettes', value: 'trompettes' },
                    { text: 'Violoncelles', value: 'violoncelles' }
                ]
            }
        },
        computed: {
            videoName() {
                return 'video-' + this.video;
            },
            videoElement() {
                return this.$refs[this.videoName][0];
            }
        },
        mounted() {
            setInterval(() => this.sync(), 1500);
            this.$refs.audio.onplay = () => this.onPlay();
            this.$refs.audio.onpause = () => this.onPause();
        },
        methods: {
            toggleFullscreen() {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
                    document.documentElement.msRequestFullscreen();
                }
            },
            sync() {
                this.videoElement.currentTime = this.$refs.audio.currentTime;
                if (this.playing && this.videoElement.paused) {
                    this.videoElement.play();
                } else if (!this.playing && !this.videoElement.paused) {
                    this.videoElement.pause();
                }
            },
            onPlay() {
                this.playing = true;
                this.videoElement.play();
                this.$refs.audio.play();
            },
            onPause() {
                this.playing = false;
                this.videoElement.pause();
                this.$refs.audio.pause();
            }
        },
        watch: {
            video() {
                this.sync();
            }
        }
    }
</script>

<style lang="scss">
     #home {
         width: 100%;
         height: 100%;
         overflow: hidden;
         background: black url('../assets/img/background.jpg') no-repeat center;

         .menu {
             position: fixed;
             bottom: 0;
             left: 0;
             right: 0;
             height: 70px;
             padding: 10px;
             text-align: center;
             z-index: 1;
             flex: 1;
             background: rgba(4, 8, 13, 0.4);

             audio {
                 vertical-align: middle;
                 width: 500px;
             }

             .btn-group {
                 .btn {
                     &.active {
                         color: #000 !important;
                         background-color: white !important;
                     }
                 }
             }
         }

         video {
             width: 100%;
             max-width: 100%;
             object-fit: contain;
         }
     }
</style>

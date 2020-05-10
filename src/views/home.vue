<template>
    <div id="home">
        <main-page>
            <div id="select-character" v-if="!video">
                <div class="logo-container text-center">
                    <b-img class="logo" :src="require('../assets/logo.png')"></b-img>

                    <h4 class="my-3 text-uppercase font-weight-light" style="letter-spacing: 2px">Choisissez votre section</h4>
                </div>
                <div class="character" v-for="v in videos" :key="'select-' + v.value" @click="selectVideo(v.value)">
                    <b-img :src="require('../assets/img/' + v.value + '.png')"></b-img>
                    <div class="name">{{v.text}}</div>
                </div>
            </div>
            <div id="player" v-if="video">
<!--                <template v-for="v in videos">-->
<!--                    <video :ref="'video-' + v.value" v-if="video === v.value" :key="v.value" :src="require('../assets/videos/' + v.value +'.webm')" muted></video>-->
<!--                </template>-->
                <video ref="video" v-if="video" :src="require('../assets/videos/' + video +'.webm')" muted></video>
            </div>
        </main-page>
        <div class="menu" v-show="video">
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
                video: null,
                playing: false,
                videos: [
                    { text: 'Clarinettes', value: 'clarinettes' },
                    { text: 'Cors & Tubas', value: 'cors' },
                    { text: 'Flutes', value: 'flutes' },
                    { text: 'Percussions', value: 'percussions' },
                    { text: 'Sax', value: 'sax' },
                    { text: 'Solistes', value: 'solistes' },
                    { text: 'Trombones', value: 'trombones' },
                    { text: 'Trompettes', value: 'trompettes' },
                    { text: 'Cellos & Basse', value: 'violoncelles' }
                ]
            }
        },
        computed: {
            videoName() {
                return 'video';
            },
            videoElement() {
                if (this.video && this.$refs[this.videoName]) {
                    return this.$refs[this.videoName][0];
                } else {
                    return null;
                }
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
                if (!this.$refs.video || !this.$refs.audio) {
                    return;
                }
                this.$refs.video.currentTime = this.$refs.audio.currentTime;
                if (this.playing && this.$refs.video.paused) {
                    this.$refs.video.play();
                } else if (!this.playing && !this.$refs.video.paused) {
                    this.$refs.video.pause();
                }
            },
            onPlay() {
                this.playing = true;
                this.$refs.audio.play();
                this.$refs.video.play();
            },
            onPause() {
                this.playing = false;
                this.$refs.audio.pause();
                this.$refs.video.pause();
            },
            selectVideo(video) {
                this.video = video;
                setTimeout(() => {
                    this.$refs.audio.play();
                }, 100);
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
         background: black;
         padding: 20px;

         #select-character {
             margin: 0 auto;
             border: 3px solid #444;
             padding: 20px;
             max-width: 1024px;
             text-align: center;
             max-height: calc(100vh - 40px);
             overflow-y: auto;

             .logo {
                 max-width: 200px;
                 margin-bottom: 20px;
             }

             .character {
                 display: inline-block;
                 margin: 10px auto;
                 width: 200px;
                 cursor: pointer;

                 outline: 3px solid transparent !important;
                 transition: transform 150ms, outline 150ms;

                 img {
                     margin: 10px auto;
                     width: 100px;
                     display: block;
                 }

                 .name {
                     display: block;
                     font-weight: 500;
                 }

                 &:hover {
                     transform: scale(1.1);
                     outline: 3px solid #777 !important;
                 }
             }
         }

         .menu {
             position: fixed;
             bottom: 0;
             left: 0;
             right: 0;
             min-height: 70px;
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

         .player {
             background: black url('../assets/img/background.jpg') no-repeat center;
         }
     }
</style>

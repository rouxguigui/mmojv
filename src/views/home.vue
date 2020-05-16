import {page} from "vue-analytics";
<template>
    <div id="home">
        <main-page>
            <div id="select-character" v-if="!video">
                <div class="logo-container text-center">
                    <b-img class="logo" :src="require('../assets/logo.png')"></b-img>

                    <h4 class="my-2 text-uppercase font-weight-light text-accent" style="letter-spacing: 2px">Choisissez votre section</h4>
                    <p style="opacity: 0.8">Vous pourrez changer de section pendant la vidéo</p>
                </div>
                <div class="characters">
                    <div class="character" v-for="v in videos" :key="'select-' + v.value" @click="selectVideo(v.value)">
                        <b-img :src="require('../assets/img/' + v.value + '.png')"></b-img>
                        <div class="name">{{v.text}}</div>
                    </div>
                </div>
                <p class="mt-4">Vous pouvez aussi voir le montage complet sur
                    <a class="text-accent" href="https://www.youtube.com/watch?v=0wuahEgZnSw&feature=youtu.be">YouTube</a>
                </p>
                <p>
                    <span style="opacity: 0.8">Une expérience de l'Orchestre de Jeux Vidéo</span>
                </p>
                <a class="text-accent ml-2" target="_blank" href="https://www.orchestre-ojv.ca">https://www.orchestre-ojv.ca/</a>
                <br>
                <div class="mt-2">
                    <a class="ml-3" title="Suivez-nous sur Facebook" v-b-tooltip target="_blank" href="https://www.facebook.com/orchestre.ojv"><i class="fab fa-lg fa-facebook"></i></a>
                    <a class="ml-3" title="Visitez notre chaîne YouTube" v-b-tooltip target="_blank" href="https://www.youtube.com/channel/UCf5e9hPIxFhcfOjIHHsOyeA"><i class="fab fa-lg fa-youtube"></i></a>
                    <a class="ml-3" title="Suivez-nous sur Instagram" v-b-tooltip target="_blank" href="https://www.instagram.com/orchestre.ojv"><i class="fab fa-lg fa-instagram"></i></a>
                </div>

                <div class="mt-5" style="opacity: 0.4; font-size: 10pt;">
                    Icon made by Freepik from <a href="www.flaticon.com" target="_blank">www.flaticon.com</a>
                </div>
            </div>
            <div id="player" v-if="video">
                <video ref="video" v-if="video" :src="require('../assets/videos/' + video +'.webm')" :poster="require('../assets/img/background.jpg')" muted></video>
            </div>
        </main-page>
        <div class="menu" v-show="video" :class="{ 'reduced': !showMenu }">
            <b-btn @click="showMenu = !showMenu" class="float-left mr-2 mt-2">
                <i v-if="showMenu" class="fas fa-caret-down"></i>
                <i v-else class="fas fa-caret-up"></i>
            </b-btn>
            <div v-show="showMenu">
                <b-btn class="mr-2" @click="stopVideo"><i class="fas fa-home"></i></b-btn>

                <b-dropdown v-if="!isLargeLayout && currentVideo" dropup>
                    <template #button-content>
                        {{currentVideo.text}}
                    </template>
                    <b-radio-group buttons v-model="video" stacked :options="videos"></b-radio-group>
                </b-dropdown>
                <b-radio-group v-else buttons v-model="video" :options="videos"></b-radio-group>

                <b-select class="ml-2" v-b-tooltip v-model.number="latency" title="Décalage audio / vidéo (ajustez pour mieux synchroniser)">
                    <option :value="0.01">10ms</option>
                    <option :value="0.02">20ms</option>
                    <option :value="0.05">50ms</option>
                    <option :value="0.08">80ms</option>
                    <option :value="0.1">100ms</option>
                    <option :value="0.15">150ms</option>
                    <option :value="0.2">200ms</option>
                    <option :value="0.25">250ms</option>
                    <option :value="0.3">300ms</option>
                    <option :value="0.35">350ms</option>
                    <option :value="0.4">400ms</option>
                    <option :value="0.45">450ms</option>
                    <option :value="0.5">500ms</option>
                    <option :value="0.55">550ms</option>
                    <option :value="0.6">600ms</option>
                    <option :value="0.65">650ms</option>
                    <option :value="0.7">700ms</option>
                    <option :value="0.75">750ms</option>
                    <option :value="0.8">800ms</option>
                    <option :value="0.85">850ms</option>
                    <option :value="0.9">900ms</option>
                    <option :value="0.95">950ms</option>
                    <option :value="1">1s</option>
                </b-select>

                <audio class="ml-2" ref="audio" :src="require('../assets/audio/audio.mp3')" controls></audio>

                <b-btn v-if="!isMobileLayout" class="float-right mt-2" @click="toggleFullscreen"><i class="fas fa-expand-wide"></i></b-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import MainPage from "../components/main-page";
    import { page } from 'vue-analytics'

    export default {
        name: "home",
        components: {MainPage},
        data() {
            return {
                time: 0,
                video: null,
                playing: false,
                showMenu: true,
                latency: 0.1,
                videos: [
                    { text: 'Orchestre', value: 'orchestre' },
                    { text: 'Clarinettes', value: 'clarinettes' },
                    { text: 'Cors & Tubas', value: 'cors' },
                    { text: 'Flûtes', value: 'flutes' },
                    { text: 'Percussions', value: 'percussions' },
                    { text: 'Saxophones', value: 'sax' },
                    { text: 'Solistes', value: 'solistes' },
                    { text: 'Trombones', value: 'trombones' },
                    { text: 'Trompettes', value: 'trompettes' },
                    { text: 'Cellos & Basse', value: 'violoncelles' }
                ]
            }
        },
        computed: {
            isMobileLayout() {
                return window.innerWidth < 640;
            },
            isLargeLayout() {
                return window.innerWidth > 1368;
            },
            currentVideo() {
                return this.videos.find(v => {
                    return v.value === this.video;
                });
            }
        },
        mounted() {
            page('/');
            setInterval(() => this.sync(), 2000);
            this.$refs.audio.onplay = () => this.onPlay();
            this.$refs.audio.onpause = () => this.onPause();

            if (localStorage.getItem('latency')) {
                this.latency = parseFloat(localStorage.getItem('latency'));
            }
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
                if (Math.abs(this.$refs.video.currentTime - this.$refs.audio.currentTime) > 0.3) {
                    this.applySync();
                }
                if (this.playing && this.$refs.video.paused) {
                    this.$refs.video.play();
                } else if (!this.playing && !this.$refs.video.paused) {
                    this.$refs.video.pause();
                }
            },
            applySync() {
                if (!this.$refs.video || !this.$refs.audio) {
                    return;
                }
                this.$refs.video.currentTime = Math.min(this.$refs.audio.currentTime + this.latency, this.$refs.video.duration);
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
            },
            stopVideo() {
                this.video = null;
                this.$refs.audio.pause();
            }
        },
        watch: {
            video() {
                this.sync();
                if (this.video) {
                    page('/' + this.video);
                } else {
                    page('/');
                }
            },
            latency() {
                this.applySync();
                localStorage.setItem('latency', this.latency);
            }
        }
    }
</script>

<style lang="scss">
</style>

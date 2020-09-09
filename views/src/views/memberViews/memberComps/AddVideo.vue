<template>
    <div class="form-container" :style="{ cursorProgess: queryPending }">
        <div class="input-container">
            <label for="courseTitle" class="input-label">Video title</label>
            <input @input="$v.newVideo.title.$touch()" :class="{ errorUX: $v.newVideo.title.$error }" v-model.trim="newVideo.title" type="text" class="form-control" placeholder="Video title goes here">
        </div>
        <p class="error-box" v-if="$v.newVideo.title.$error">The video title has to contain between 6-70 characters</p>
        <div class="input-container">
            <label class="input-label" for="email">Video (in MP4)</label>
            <input @change="selectFile" class="form-control-file" ref="file" type="file" name="image" placeholder="Enter your e-mail address">
        </div>
        <div class="input-container">
            <label for="description" class="input-label label__for-description">Video description</label>
            <textarea @input="$v.newVideo.description.$touch()" v-model.trim="newVideo.description" :class="{ errorUX: $v.newVideo.description.$error }" class="form-control textarea-control" placeholder="Describe your course here"></textarea>
        </div>
        <p class="error-box" v-if="$v.newVideo.description.$error">The course description can contain up to 560 characters.</p>
        <p v-if="invalidVideoInput" class="error-box">The video needs a title, a file and a description!</p>
        <div class="button-container">
            <button v-if="!queryPending && !$v.$invalid" :disabled="$v.$invalid" @click="postVideo" class="submit-button">Add video</button>
            <button v-if="!queryPending && $v.$invalid" @click="invalidVideoInput = true" class="submit-button">Add video</button>
        </div>
        <v-progress-linear
        v-model="uploadPercentage"
        v-if="queryPending"
        style="margin-top: 20px;"
        height="25"
        color="#264653"
        striped
        >
        <strong style="color: white">{{ uploadPercentage }}%</strong>
        </v-progress-linear>
        <v-progress-circular
        v-if="uploadPercentage === 100"
        indeterminate
        color="primary"
        style="margin-top: 20px;"
        ></v-progress-circular>
        <p v-if="uploadPercentage === 100" class="public-disclaimer">
            Just hold on a few seconds more, while your upload is being received!
        </p>
        <app-dialog v-if="dialogActive" dialogText="Hold your horses! First pick a file to upload." buttonText="Got it!" />
    </div>
</template>

<script>
import axios from 'axios'
import { minLength, maxLength, required } from 'vuelidate/lib/validators'
import appDialog from '@/components/Dialog'

export default {
    components: { appDialog },
    data() {
        return {
            newVideo: {
                title: '',
                description: '',
                courseId: this.$store.state.currentCourse,
                order: 0,
                rdmString: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            },
            selectedFile: '',
            queryPending: false,
            invalidVideoInput: false,
            uploadPercentage: 0,
            dialogActive: false
        }
    },
    methods: {
        selectFile(event) {
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
        },
        postVideo() {
            if (!this.selectedFile) {
                return this.dialogActive = true;
            }
            this.queryPending = true;
            if (this.$store.state.currentCourseObject.courseData.classIds) {
                this.newVideo.order = this.$store.state.currentCourseObject.courseData.classIds.length + 1;
            } else {
                this.newVideo.order = 0;
            }
            const videoData = JSON.stringify(this.newVideo);
            const fd = new FormData();
            fd.append('image', this.selectedFile);
            fd.append('videoData', videoData);
            axios.post('api/content/add-video', fd, {
                onUploadProgress: progressEvent => {
                    this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                }
            })
                .then(response => {
                    this.queryPending = false;
                    console.log(response);
                    this.$store.state.currentCourseObject = response.data.currentCourseObject;
                    console.log(this.$store.state.currentCourseObject);
                    this.$store.state.courseCreatorPage = 2;
                    this.newVideo.currentVideo = this.$store.state.courseCreatorPage;
                    this.newVideo.title = '';
                    this.newVideo.description = '';
                })
                .catch(err => console.log(err));
        }
    },
    validations: {
        newVideo: {
            title: {
                minLength: minLength(6),
                maxLength: maxLength(70),
                required
            },
            description: {
                minLength: minLength(6),
                maxLength: maxLength(450),
                required
            }
        }
    },
    created() {
        axios.get(`api/content/course/${this.$store.state.currentCourse}`)
            .then(response => {
                this.$store.state.currentCourseObject = response.data.currentCourseObject;
                this.$store.state.currentCourse = response.data.currentCourseObject.courseData._id;
            })
            .catch(err => console.log(err));
    }
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;

    
        .form-container {
            width: 56%;
            min-width: 400px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            border-radius: 10px;
            .input-container {
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .input-label {
                    font-size: 18px;
                    margin-bottom: 3px;
                }
                .form-control {
                    width: 350px;
                    padding: 0.7rem;
                    border-top: 0;
                    border-left: 0;
                    border-right: 0;
                    border-bottom: 1px solid black;
                    border-radius: 0;
                    outline: none;
                    resize: none;
                    &:focus {
                        border: 1px solid $orange;
                        outline: none;
                        box-shadow: 0px 1px 3px 0px $darkOrange;
                    }
                }
                .label__for-description {
                    margin-top: 30px;

                }
                .textarea-control {
                    height: 200px;
                    border: 1px solid black;
                    margin-top: 10px;
                }
                .select-input {
                    width: 350px;
                    padding: 0.7rem;
                    border-top: 0;
                    border-left: 0;
                    border-right: 0;
                    border-bottom: 1px solid black;
                    &:focus {
                        border: 1px solid $orange;
                        outline: none;
                        box-shadow: 0px 1px 3px 0px $darkOrange;
                    }
                }
            }
            .button-container {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
            .submit-button {
                padding: 0.5rem;
                font-weight: 600;
                font-size: 16px;
                background-color: $darkOrange;
                color: white;
                border: 1px solid $darkOrange;
                outline: none;
                cursor: pointer;
                border-radius: 3px;
                &:hover {
                    animation: buttonHover;
                    animation-iteration-count: 1;
                    animation-duration: 0.3s;
                    animation-fill-mode: forwards;
                }
            }
        }

    @keyframes buttonHover {
        0% {
            color: white;
            background-color: $darkOrange;
        }
        100% {
            color: $darkOrange;
            background-color: white;
            transform: scale(1.04);
        }
    }

    // VUELIDATE CLASSES
    .errorUX {
        background-color: rgb(241, 197, 201);
    }

    .error-box {
        background-color: rgb(241, 197, 201);
        margin-top: 10px;
        padding: 0.5rem;
        border-radius: 3px;
    }

    .cursorProgress {
        cursor: progress;
    }

    .public-disclaimer {
        background-color: rgb(142, 212, 221);
        margin-top: 10px;
        padding: 0.5rem;
        border-radius: 3px;
        width: 80%;
        text-align: center;
    }
</style>
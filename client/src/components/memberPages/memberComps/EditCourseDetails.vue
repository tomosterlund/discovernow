<template>
    <div class="form-container">
        <h1>Edit course details</h1>
        <div class="input-container">
            <label for="courseTitle" class="input-label">Course title</label>
            <input @input="$v.newCourse.title.$touch()" :class="{ errorUX: $v.newCourse.title.$error }" v-model.trim="newCourse.title" type="text" class="form-control" placeholder="Course title goes here">
        </div>
        <p class="error-box" v-if="$v.newCourse.title.$error">Title needs to contain between 6-70 characters</p>
        <div class="input-container">
            <label for="courseTitle" class="input-label">Course subject</label>
            <select value="Other" v-model="newCourse.subjects" class="select-input" id="subjects">
                <option value="Maths">Maths</option>
                <option value="Languages">Languages</option>
                <option value="Science">Science</option>
                <option value="Geography">Geography</option>
                <option value="Social studies">Social studies</option>
                <option value="Tech">Tech</option>
                <option value="Music">Music</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div class="input-container">
            <label for="description" class="input-label label__for-description">Course description</label>
            <textarea @input="$v.newCourse.description.$touch()" v-model.trim="newCourse.description" :class="{ errorUX: $v.newCourse.description.$error }" class="form-control textarea-control" placeholder="Describe your course here"></textarea>
        </div>
        <p class="error-box" v-if="$v.newCourse.description.$error">The course description can contain up to 560 characters.</p>
        <div class="input-container">
            <label for="courseImage" class="input-label">Course image</label>
            <div class="course-image" :style="courseImageCss"></div>
        </div>
        <div class="input-container" style="margin-top: 20px;">
            <label class="input-label" for="email">Pick a new image (.jpg, .jpeg or .png)</label>
            <input @change="selectFile" class="form-control-file" ref="file" type="file" name="image" placeholder="Enter your e-mail address">
        </div>
        <div class="toggle-container">
            <label for="toggle">Make this course public</label>
            <toggle-button v-model="newCourse.public" color="#2a9d8f" />
        </div>
        <p class="public-disclaimer" v-if="!newCourse.public">By disabling the public option, the videos of this course will only be available for sharing through links.</p>
        <div class="button-container">
            <span @click="postCreateCourse">
                <app-button buttonText="Save details" />
            </span>
            <button @click="deleteDisclaimer = true" class="delete-button">Delete course</button>
        </div>
        <p class="deletion-disclaimer" v-if="deleteDisclaimer">
            Are you sure you want to delete this course? This action can not be reversed.
            <button @click="deleteCourse" class="delete-button">Yes, delete course</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios'
import { minLength, maxLength, required } from 'vuelidate/lib/validators'
import appButton from './../../mainComponents/AppButton'

export default {
    data() {
        return {
            newCourse: {
                title: this.$store.state.currentCourseObject.courseData.courseTitle,
                subjects: this.$store.state.currentCourseObject.courseData.courseSubject,
                description: this.$store.state.currentCourseObject.courseData.description,
                public: this.$store.state.currentCourseObject.courseData.public,
                _id: this.$store.state.currentCourseObject.courseData._id
            },
            selectedFile: '',
            deleteDisclaimer: false
        }
    },
    methods: {
        postCreateCourse() {
            const courseData = JSON.stringify(this.newCourse);
            const fd = new FormData();
            fd.append('image', this.selectedFile);
            fd.append('course', courseData);
            axios.post('api/content/edit-course', fd)
                .then(response => {
                    console.log(response);
                    this.newCourse.title = '';
                    this.newCourse.subjects = '';
                    this.newCourse.description = '';
                    this.$store.state.currentCourseObject = response.data.currentCourseObject;
                    this.$store.state.courseCreatorPage = 2;
                })
                .catch(err => console.log(err));
        },
        selectFile(event) {
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
        },
        deleteCourse() {
            axios.delete(`api/content/delete-course/${this.$store.state.currentCourseObject.courseData._id}`)
                .then(response => {
                    console.log(response);
                    this.$router.push({ path: '/my-content' });
                })
                .catch(err => console.log(err));
        }
    },
    validations: {
        newCourse: {
            title: {
                minLength: minLength(6),
                maxLength: maxLength(70)
            },
            subjects: {
                required
            },
            description: {
                maxLength: maxLength(560)
            }
        }
    },
    computed: {
        courseImageCss: function() {
            return {
                backgroundImage: `url('https://discover-test-files.s3.eu-central-1.amazonaws.com/${this.$store.state.currentCourseObject.courseData.courseImageUrl}')`
            }
        }
    },
    components: {
        appButton
    }
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;
    $deleteRed: rgb(241, 50, 50);
    
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
                width: 60%;
                display: flex;
                justify-content: space-around;
                margin-top: 20px;
            }
            .delete-button {
                padding: 0.5rem;
                font-weight: 700;
                font-size: 16px;
                background-color: $deleteRed;
                color: white;
                border: 1px solid $deleteRed;
                outline: none;
                cursor: pointer;
                border-radius: 3px;
                &:hover {
                    animation: deleteButtonHover;
                    animation-iteration-count: 1;
                    animation-duration: 0.3s;
                    animation-fill-mode: forwards;
                }
            }
            .toggle-container {
                margin-top: 20px;
                display: flex;
                align-items: center;
                label {
                    font-size: 18px;
                    margin-right: 10px;
                }
            }
        }

    @keyframes deleteButtonHover {
        0% {
            color: white;
            background-color: $deleteRed;
        }
        100% {
            color: $deleteRed;
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

    .public-disclaimer {
        background-color: rgb(142, 212, 221);
        margin-top: 10px;
        padding: 0.5rem;
        border-radius: 3px;
        width: 80%;
    }

    .deletion-disclaimer {
        background-color: rgb(221, 142, 142);
        margin-top: 10px;
        padding: 0.5rem;
        border-radius: 3px;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .course-image {
        height: 150px;
        width: 150px;
        background-size: cover;
        border-radius: 3px;
        box-shadow: 0px 1px 3px 0px gray;
    }
</style>
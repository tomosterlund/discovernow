<template>
    <div class="form-container">
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
        <p class="error-box" v-if="$v.newCourse.description.$error">The course description can has to be between 6 and 450 characters.</p>
        <div class="input-container" style="margin-top: 20px;">
            <label class="input-label" for="email">Course image (.jpg, .jpeg or .png)</label>
            <input @change="selectFile" class="form-control-file" ref="file" type="file" name="image" placeholder="Enter your e-mail address">
        </div>
        <div class="toggle-container">
            <label for="toggle">Make this course public</label>
            <toggle-button v-model="newCourse.public" color="#2a9d8f" />
        </div>
        <p class="public-disclaimer" v-if="!newCourse.public">By disabling the public option, the videos of this course will only be available for sharing through links.</p>
        <p v-if="invalidCourseInfo" class="error-box">All fields need to be filled out properly</p>
        <div class="button-container">
            <span v-if="!$v.$invalid" @click="postCreateCourse">
                <app-button buttonText="Next step" />
            </span>
            <span @click="invalidCourseInfo = true" v-if="$v.$invalid">
                <app-button buttonText="Next step" />
            </span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { minLength, maxLength, required } from 'vuelidate/lib/validators'
import appButton from './../../../components/AppButton'

export default {
    data() {
        return {
            newCourse: {
                title: '',
                subjects: 'Other',
                description: '',
                public: true
            },
            selectedFile: '',
            invalidCourseInfo: false
        }
    },
    methods: {
        postCreateCourse() {
            const courseData = JSON.stringify(this.newCourse);
            const fd = new FormData();
            fd.append('image', this.selectedFile);
            fd.append('course', courseData);
            axios.post('api/content/create-course', fd)
                .then(response => {
                    console.log(response);
                    this.newCourse.title = '';
                    this.newCourse.subjects = '';
                    this.newCourse.description = '';
                    this.$store.state.currentCourse = response.data.currentCourse._id;
                    this.$store.state.courseCreatorPage = 1;
                })
                .catch(err => console.log(err));
        },
        selectFile(event) {
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
        },
    },
    validations: {
        newCourse: {
            title: {
                minLength: minLength(6),
                maxLength: maxLength(70),
                required
            },
            subjects: {
                required
            },
            description: {
                minLength: minLength(6),
                maxLength: maxLength(450),
                required
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
</style>
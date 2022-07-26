import TeacherScreen from "../pages/teacher/TeacherScreen";
import TeacherLessons from "../pages/teacher/lesson/TeacherLessons";
import TeacherTexts from "../pages/teacher/text/TeacherTexts";
import LessonDetail from "../pages/teacher/lesson/LessonDetail";
import TextDetailTeacher from "../pages/teacher/text/TextDetail";
import QuestionDetails from "../pages/teacher/text/details/QuestionDetails";
import ActivityDetail from "../pages/teacher/activity/ActivityDetail";
import StudentReply from "../pages/teacher/activity/StudentReply";
import TeacherPolls from "../pages/teacher/poll/TeacherPolls";
import PollDetail from "../pages/teacher/poll/PollDetail";
import StudentPollReply from "../pages/teacher/poll/StudentPollReply";

import store from "../store";

export const teacherRoute = {
    path: '/profe',
    redirect: 'profe/asignaturas',
    component: TeacherScreen,
    async beforeEnter(to, from, next) {
        await store.dispatch('userInfo')
            .then( () => {
                if(store.getters.getUserInfo.rol === 0) next('estudiante')
                else if(store.getters.getUserInfo.rol === 1) next();
                else next('login');
            })
            .catch(() => next('login'))
    },
    children: [
        { path: 'encuestas', component: TeacherPolls },
        { path: 'asignaturas', component: TeacherLessons },
        { path: 'textos', component: TeacherTexts },
        { path: 'asignaturas/:id', component: LessonDetail, props: true },
        { path: 'textos/:id', component: TextDetailTeacher, props: true },
        { path: 'encuestas/:id', component: PollDetail, props: true },
        { path: 'pregunta/:id', component: QuestionDetails, props: true },
        { path: 'grafico/:id', component: ActivityDetail, props: true },
        { path: 'respuestas/:idEstudiante/:idActividad', component: StudentReply, props: true },
        { path: 'respuestasP/:idEstudiante/:idActividad', component: StudentPollReply, props: true },
    ]
};



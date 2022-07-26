import StudentScreen from "../pages/students/StudentScreen";
import StudentLessons from "../pages/students/StudentLessons";
import ActivityDetail from "../pages/students/activities/unfinish/ActivityDetail";
import StudentActivities from "../pages/students/StudentActivities";
import StudentPolls from "../pages/students/StudentPolls";
import PollDetail from "../pages/students/poll/unfinish/PollDetail";
import DetailFinish from "../pages/students/activities/finish/DetailFinish";
import store from "../store";

export const studentRoute = {
    path: '/estudiante',
    redirect: 'estudiante/asignaturas',
    component: StudentScreen,
    async beforeEnter(to, from, next) {
        await store.dispatch('userInfo')
            .then( () => {
                if(store.getters.getUserInfo.rol === 1)next('profe')
                else if(store.getters.getUserInfo.rol === 0) next();
                else next('login');
            })
            .catch(() => next('login'))
    },
    children: [
        { path: 'asignaturas', component: StudentLessons },
        { path: 'actividades/:id', component: StudentActivities, props: true },
        { path: 'encuestas/:id', component: StudentPolls, props: true },
        { path: 'encuesta/:id', component: PollDetail, props: true },
        { path: 'textos/:id', component: ActivityDetail, props: true, },
        { path: 'finalizada/:id', component: DetailFinish }
    ]
}
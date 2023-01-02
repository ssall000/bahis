
const map={
    'International':'World'
}
export default {
    get(r1){
        if(map[r1]){
            return map[r1];
        }
        return r1;
    }
}
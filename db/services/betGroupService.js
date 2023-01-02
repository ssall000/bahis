import betGroupRepository from "../repositories/betGroupRepository.js";


export default {
    async getGroup(id) {
        const res=await  betGroupRepository.getGroup(id);
        return  res.value;
    }

}
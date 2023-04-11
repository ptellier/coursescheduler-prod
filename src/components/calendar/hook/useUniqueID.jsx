const useUniqueID = () => {

    const getUUID = () => {
        let dt = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            // eslint-disable-next-line no-mixed-operators
            return (c==='x' ? r :(r&0x3|0x8)).toString(16);
        });
    }

    return {getUUID}
}

export default useUniqueID
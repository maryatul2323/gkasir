class quantityHelper {

    static tambah(count) {
        count + 1
        return count;
    }
    static kurang(count) {
        if (count < 1) {

        } else {
          count - 1
          return count;
        }
    }
}

export default quantityHelper;

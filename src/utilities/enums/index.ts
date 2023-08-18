export enum Msg {
    DATA_ADD_SUCCESS = 'Data Added Successfully',
    DATA_ADD_FAIL = 'Failed to Add Data',
    DATA_UPDATE_SUCCESS = 'Data Updated Successfully',
    DATA_UPDATE_FAIL = 'Failed to Update Data',
    DATA_FETCH_SUCCESS = 'Data Loaded Successful',
    DATA_FETCH_FAIL = 'Failed to Load Data',
    DATA_DELETE_SUCCESS = 'Data Deleted Successfully',
    DATA_DELETE_FAIL = 'Failed to Delete Data',
    DATA_EXIST = 'Data Already Exists',
    DATA_NOT_FOUND = 'Data Not Found',
    DATA_DB_EMPTY = 'Database Empty',
    SERVER_ERROR = 'Internal Server Error',
    INVALID_ENTRY = 'Incorrect Input Provided'
}

export enum Rank {
    ACM = 'Air Chief Marshal',
    AM = 'Air Marshal',
    AVM = 'Air Vice Marshal',
    AIR_COMMODORE = 'Air Cdre',
    GP_CAPT = 'Gp Capt',
    WG_CDR = 'Wg Cdr',
    SQN_LDR = 'Sqn Ldr',
    FLT_LT = 'Flt Lt',
    FLG_OFFR = 'Flg Offr',
    CIV = 'Civ',
    NONE = 'Unknown'
}

export enum Month {
    Jan = '0',
    Feb = '1',
    Mar = '2',
    Apr = '3',
    May = '4',
    Jun = '5',
    Jul = '6',
    Aug = '7',
    Sep = '8',
    Oct = '9',
    Nov = '10',
    Dec = '11'
}

// ✅ For STRING Enum
// enum StringEnum {
// 	Small = 'S',
// 	Medium = 'M',
// 	Large = 'L',
//   }
//   const values = Object.values(StringEnum);
// 👇️ ['S', 'M', 'L']
//   console.log(values);
//   const names = Object.keys(StringEnum);
// 👇️ ['Small', 'Medium', 'Large']
//   console.log(names);

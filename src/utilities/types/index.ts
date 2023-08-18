export type OfficerType = {
    _id?: string | any;
    name: string;
    rank: string;
    bd: number;
    email?: string;
    mobile?: string;
    unit?: string;
    outStation?: boolean;
    messIn?: boolean;
};

export type ResponseType = {
    message: string;
    success: boolean;
    data?: OfficerType | ContributionType | any;
};

export type ContributionType = {
    _id: string | any;
    type: string;
    amount: number;
};

export type DailyMessingType = {
    date?: Date;
    offr?: string | any;
    breakfast?: number;
    lunch?: number;
    dinner?: number;
    _id?: string | any;
};

export type MessBill = {
    _id?: any;
    offr: string | OfficerType;
    bd?: number;
    bf?: number; // less paid in last month
    cf?: number; // extra paid in last month
    duration?: {
        start: Date;
        end: Date;
    };
    messing?: number;
    accommodation?: number;
    extraMessing?: number;
    batmanCharge?: number;
    contributions?: ContributionType[] | number;
    miscBills?: { type: string; amount: Number }[];
    total?: number;
    payment?: number;
    emailSent?: boolean;
    status?: string;
};

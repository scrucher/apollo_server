export const DbUrl = process.env.DB_URL || 'mongodb://localhost:27018/delivery' ;
export const DbConnectionOptions = {
    directConnection: true,
    autoCreate: true,
    
};
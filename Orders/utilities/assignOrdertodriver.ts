import { InternalServerError } from "routing-controllers";
import { DriverModel } from "../../Drivers/Driver.model";
import { DriverNotificationsModel } from "../../Drivers/driver.notification";
import { OrderToDriverModel } from "./orderToDriver.model";
import { StoreNotificationsModel } from "../../Store/store.notifications";



export async function AssignOrderToDriver(coordinates: any, order: any, store: any, user: any) {
    const date = Date.now();
    await OrderToDriverModel.deleteMany()
        .where("date", date)
        .then(async () => {
            try {
                const orderToDriver = new OrderToDriverModel()
                const driver = await DriverModel.findOne({
                    location: {
                        $nearSphere: coordinates,
                        $maxDistance: 3,
                    }
                })
                if (driver) {
                    let expiresDate = new Date();
                    expiresDate.setDate(expiresDate.getDate() + 60 / 60)
                    //@ts-ignore
                    orderToDriver.driver = driver._id;
                    orderToDriver.order = order;
                    orderToDriver.date = expiresDate;
                    let saved;
                    try {
                        saved = await orderToDriver.save();
                    } catch (err) {
                        throw new InternalServerError('Internal Server Error');
                    }
                    if (saved) {
                        try {
                            const notifi = new DriverNotificationsModel();
                            notifi.orders = order;
                            notifi.stores = store;
                            notifi.users = user;
                            await notifi.save();
                            const notifications = new StoreNotificationsModel();
                            notifications.orders = order;
                            notifications.drivers =driver.id;
                            notifications.users = user;
                            await notifications.save();
                        } catch (err) {
                            console.log(err);
                            throw new InternalServerError('Internal Server Error');
                        }
                    }
                }
            } catch (err) {
            throw new InternalServerError('Inernal Server Error')
            }            
        })
        .catch(err => {
            console.log(err);
            throw new InternalServerError('Internal Server Error');
        })
}
const mongodb = require("mongodb");
const db = require("../data/database");

class Order {
    constructor(cart, user, status = "pending", date, orderId) {
        this.cart = cart;
        this.user = user;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        }
        this.id = orderId;
    }

    static async fetchOrderById(orderId) {
        const result = await db
            .getDb()
            .collection("orders")
            .findOne({ _id: new mongodb.ObjectId(orderId) });
        return this.transformOrder(result);
    }

    async saveOrder() {
        if (this.orderId) {
            return await db
                .getDb()
                .collection("orders")
                .updateOne({ _id: this.id }, { $set: { status: this.status } });
        } else {
            return await db.getDb().collection("orders").insertOne({
                cart: this.cart,
                user: this.user,
                date: new Date(),
                status: this.status,
            });
        }
    }

    static transformOrder(order) {
        return new Order(
            order.cart,
            order.user,
            order.status,
            order.date,
            order._id
        );
    }

    static transformOrders(orders) {
        return orders.map(this.transformOrder);
    }

    static async fetchOrdersForUser(userId) {
        const result = await db
            .getDb()
            .collection("orders")
            .find({ "user._id": new mongodb.ObjectId(userId) })
            .sort({ _id: -1 })
            .toArray();
        return this.transformOrders(result);
    }

    static async fetchAllOrders() {
        const result = await db
            .getDb()
            .collection("orders")
            .find()
            .sort({ _id: -1 })
            .toArray();
        return this.transformOrders(result);
    }
}

module.exports = Order;

const { orderStatuses } = require("./orderStatuses");

describe('orderStatuses', () => {
    // placed: 'placed',
    // canceled: 'canceled',
    // processing: 'processing',
    // inRoute: 'delivering',
    // delivered: 'delivered',
    // received: 'received',
    it('should contain placed', () => {
        expect(orderStatuses.placed).toEqual('placed');
    });

    it('should contain canceled', () => {
        expect(orderStatuses.canceled).toEqual('canceled');
    });

    it('should contain processing', () => {
        expect(orderStatuses.processing).toEqual('processing');
    });

    it('should contain inRoute', () => {
        expect(orderStatuses.inRoute).toEqual('delivering');
    });

    it('should contain delivered', () => {
        expect(orderStatuses.delivered).toEqual('delivered');
    });

    it('should contain received', () => {
        expect(orderStatuses.received).toEqual('received');
    });
});

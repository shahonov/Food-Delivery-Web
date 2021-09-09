import { roles } from './roles';

describe('roles', () => {
    it('should contain regular user role', () => {
        expect(Object.keys(roles)).toContain(roles.regularUser);
    });

    it('should contain restaurant owner role', () => {
        expect(Object.keys(roles)).toContain(roles.restaurantOwner);
    });

    it('should contain 2 roles', () => {
        expect(Object.keys(roles).length).toEqual(2);
    });
});

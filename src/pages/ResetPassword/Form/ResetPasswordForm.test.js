import React from 'react';
import { create, act } from 'react-test-renderer';
import ResetPasswordForm from './ResetPasswordForm';

describe('ResetPasswordForm', () => {
    it('should show errors when errors and touched', () => {
        const errors = {
            newPassword: 'error',
            confirmNewPassword: 'error'
        }
        const touched = {
            newPassword: 'touched',
            confirmNewPassword: 'touched'
        }
        const component = create(
            <ResetPasswordForm
                values={{}}
                errors={errors}
                touched={touched}
            />
        );
        const errorMessages = component.root.findAllByProps({ className: 'invalid-form-input' });
        expect(errorMessages.length).toEqual(2);
    });

    it('should not show errors when errors and no touched', () => {
        const errors = {
            newPassword: 'error',
            confirmNewPassword: 'error'
        }
        const touched = {};
        const component = create(
            <ResetPasswordForm
                values={{}}
                errors={errors}
                touched={touched}
            />
        );
        const errorMessages = component.root.findAllByProps({ className: 'invalid-form-input' });
        expect(errorMessages.length).toEqual(0);
    });

    it('should not show errors when touched and no errors', () => {
        const errors = {};
        const touched = {
            newPassword: 'touched',
            confirmNewPassword: 'touched'
        }
        const component = create(
            <ResetPasswordForm
                values={{}}
                errors={errors}
                touched={touched}
            />
        );
        const errorMessages = component.root.findAllByProps({ className: 'invalid-form-input' });
        expect(errorMessages.length).toEqual(0);
    });
});

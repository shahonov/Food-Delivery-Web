import { validateEmailInputs, validateInputsLengths, validateNonEmptyInputs, validateNumberInputs, validatePasswords, validatePasswordsMatch, validateUnsplashUrls } from './formikValidations';

let values = {};

beforeEach(() => {
    values = {
        test1: '12',
        test2: '',
        test3: 'test-input',
        test4: 'test.email@mail.com',
        test5: 'asdAsd',
        test6: 'qweQwe1',
        test7: 'https://source.unsplash.com/MQUqbmszGGM'
    }
})

describe('formikValidations', () => {
    describe('validateNonEmptyInputs', () => {
        it('should return non-empty-input error', () => {
            const validationResult = validateNonEmptyInputs(values, ['test2']);
            expect(validationResult).toEqual({ test2: 'Required field' });
        });

        it('should not return non-empty-input error', () => {
            const validationResult = validateNonEmptyInputs(values, ['test3']);
            expect(validationResult).toEqual({});
        });
    });

    describe('validateNumberInputs', () => {
        it('should return not-a-number-input error', () => {
            const validationResult = validateNumberInputs(values, ['test5']);
            expect(validationResult).toEqual({ test5: 'Expected number value' });
        });

        it('should not return not-a-number-input error', () => {
            const validationResult = validateNumberInputs(values, ['test1']);
            expect(validationResult).toEqual({});
        });
    });

    describe('validateEmailInputs', () => {
        it('should return not-a-valid-email-input error', () => {
            const validationResult = validateEmailInputs(values, ['test3']);
            expect(validationResult).toEqual({ test3: 'Not a valid email address' });
        });

        it('should not return not-a-valid-email-input error', () => {
            const validationResult = validateEmailInputs(values, ['test4']);
            expect(validationResult).toEqual({});
        });
    });

    describe('validatePasswords', () => {
        it('should return invalid password', () => {
            const validationResult = validatePasswords(values, ['test5']);
            expect(validationResult).toEqual(
                { test5: 'Should contain at least one lowercase, one upper case letter and a number' }
            );
        });

        it('should not return invalid password error', () => {
            const validationResult = validatePasswords(values, ['test6']);
            expect(validationResult).toEqual({});
        });
    });

    describe('validatePasswordsMatch', () => {
        it('should return passwords does not match error', () => {
            const validationResult = validatePasswordsMatch(values, ['test6', 'test5']);
            expect(validationResult).toEqual(
                {
                    test6: 'Passwords does not match',
                    test5: 'Passwords does not match'
                }
            );
        });

        it('should not return passwords does not match error', () => {
            const validationResult = validatePasswordsMatch(values, ['test6', 'test6']);
            expect(validationResult).toEqual({});
        });
    });

    describe('validateUnsplashUrls', () => {
        it('should return invalid-unsplash-photo-url error', () => {
            const validationResult = validateUnsplashUrls(values, ['test6']);
            expect(validationResult).toEqual({ test6: 'Invalid unsplash url' });
        });

        it('should not return invalid-unsplash-photo-url error', () => {
            const validationResult = validateUnsplashUrls(values, ['test7']);
            expect(validationResult).toEqual({});
        });
    });

    describe('validateInputsLengths', () => {
        it('should return minimum and maximum length error', () => {
            const minLength = 10;
            const maxLength = 20;
            const validationResult = validateInputsLengths(values, ['test6'], minLength, maxLength);
            expect(validationResult).toEqual({ test6: `Minimum length: ${minLength}, Maximum length: ${maxLength}` });
        });

        it('should not return minimum and maximum length error', () => {
            const minLength = 5;
            const maxLength = 10;
            const validationResult = validateInputsLengths(values, ['test6'], minLength, maxLength);
            expect(validationResult).toEqual({});
        });
    });
});
import { expect } from 'vitest';
import CustomModal from './CustomModal.jsx';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Test for Custom Modal', () => {
    it('should test if the modal is hidden', () => {
        render(<CustomModal />);

        const modal = screen.queryByTestId('modal');
        expect(modal).toBeNull();
    });

    it('should test if the modal is showing after clicking showModalButton', () => {
        render(<CustomModal />);

        const showModalButton = screen.getByTestId('showModalButton');
        expect(showModalButton).toBeInTheDocument();

        fireEvent.click(showModalButton);

        const modal = screen.getByTestId('modal');
        expect(modal).toBeInTheDocument();
    });
});

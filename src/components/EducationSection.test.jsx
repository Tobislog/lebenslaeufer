import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import EducationSection from "./EducationSection";

const mockInitialData = [
    {
        id: '1',
        school: 'Muster-Uni',
        title: 'B.Sc. Informatik',
        startDate: '2020-01-01',
        endDate: '2024-01-01',
    },
]

describe('EducationSection Component', () => {
    it('erlaubt das Ändern von Daten und ruft onSave beim Speichern auf', async () => {
        const handleSaveMock = vi.fn();
        const user = userEvent.setup();

        render(
            <EducationSection
                initialData={mockInitialData}
                onSave={handleSaveMock}
            />
        );
        // 1. Prüft ob erster Eintrag geladen wird
        const schoolInput = screen.getByLabelText(/School Name/i);
        expect(schoolInput).toHaveValue('Muster-Uni');

        // 2. Text im Schulnamen-Feld ändern
        await user.clear(schoolInput);
        await user.type(schoolInput, 'TU München');

        // 3. Save-Button klicken
        const saveButton = screen.getByRole('button', {name: /Save/i});
        await user.click(saveButton);

        //4. Erwartung: onSave wurde genau einmal mit neuen Daten aufgerufen
        expect(handleSaveMock).toHaveBeenCalledTimes(1);
        expect(handleSaveMock).toHaveBeenCalledWith([
            expect.objectContaining({
                school: 'TU München',
                title: 'B.Sc. Informatik',
            }),
        ]);
    });

    it('schaltet zwischen save (disabled) und Edit (enabled) um', async () => {
        const user = userEvent.setup();

        render(
            <EducationSection
                initialData={mockInitialData}
                onSave={() => {}}
            />
        );

        const schoolInput = screen.getByLabelText(/School Name/i);
        const saveButton = screen.getByRole('button', {name: /Save/i});

        // 1. Vor dem Speichern sind Inputs aktiv
        expect(schoolInput).not.toBeDisabled();

        // Save-Button klicken
        await user.click(saveButton);

        // Nach dem Speichern müssen die Inputs gesperrt sein und der Button heißt "Edit"
        expect(schoolInput).toBeDisabled();
        const editButton = screen.getByRole('button', { name: /Edit/i});
        expect(editButton).toBeInTheDocument();

        // Klick auf Edit schaltet die Inputs wieder frei
        await user.click(editButton);
        expect(schoolInput).not.toBeDisabled();
    })
})

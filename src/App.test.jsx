import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe('App Integration', () => {
    it('renders main header and innitial CV preview correctly'), () => {
        render(<App />);

        expect(screen.getByText('React CV-Maker')).toBeInTheDocument();
        expect(screen.getByText('Muster-Universität')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /als pfd herunterladen/i})).toBeInTheDocument();
    }
})

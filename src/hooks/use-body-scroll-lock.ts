"use client";

import { useEffect } from "react";

/**
 * Bloqueia o scroll do documento enquanto `locked` for verdadeiro.
 * Usado pelo menu lateral em telas pequenas.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

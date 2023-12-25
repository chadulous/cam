import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store"
export const flashEnabled = persist<boolean>(writable(false), createLocalStorage<boolean>(), 'useFlash');
export const timer = persist<number>(writable(0), createLocalStorage<number>(), 'timer');
// ============================================
// CONFIGURACIÓN GLOBAL Y VARIABLES DE ESTADO
// ============================================

// Variables globales del juego
export let scene;
export let camera;
export let player;
export let letter;
export let mailbox;
export let playerHasLetter = false;
export let deliveryCount = 0;
export let gameStarted = false;

// Sistema de vecindario expandido
export let houses = [];
export let deliveryZones = [];
export let currentTargetHouse = 0;

// Referencias de UI (HUD minimalista)
export const statusDiv = document.getElementById("status-text");
export const targetDiv = document.getElementById("target-house");
export const deliveriesDiv = document.getElementById("delivery-count");
export const interactionPrompt = document.getElementById("interaction-prompt");
export const gameTitle = document.getElementById("game-title");
export const startButton = document.getElementById("start-button");
export const statusIndicator = document.querySelector(".status-dot");
export const crosshair = document.getElementById("crosshair");
export const compassArrow = document.getElementById("compass-arrow");

// Posiciones de las casas para la brújula (se llenan en objects.js)
export let housePositions = [];
export function addHousePosition(pos) { housePositions.push(pos); }

// Funciones para modificar las variables
export function setScene(s) { scene = s; }
export function setCamera(c) { camera = c; }
export function setPlayer(p) { player = p; }
export function setLetter(l) { letter = l; }
export function setMailbox(m) { mailbox = m; }
export function setPlayerHasLetter(value) { playerHasLetter = value; }
export function setDeliveryCount(value) { deliveryCount = value; }
export function setGameStarted(value) { gameStarted = value; }
export function setCurrentTargetHouse(value) { currentTargetHouse = value; }
export function incrementDeliveryCount() { deliveryCount++; }
export function addHouse(h) { houses.push(h); }
export function addDeliveryZone(d) { deliveryZones.push(d); }

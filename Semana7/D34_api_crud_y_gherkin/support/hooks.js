import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';

setDefaultTimeout(60_000);

Before(function () {
  this.resetApiState();
});

After(async function (scenario) {
  const failed = scenario.result?.status === Status.FAILED;
  if (!failed) return;

  const lines = [];

  lines.push(`Escenario: ${scenario.pickle.name}`);
  lines.push(`Resultado: ${scenario.result.status}`);

  // Contexto “seguro” (no pegues token en logs)
  if (this.bookingId != null) lines.push(`bookingId: ${this.bookingId}`);

  // Si guardás errores de axios en el World (recomendado), adjuntalos acá
  if (this.lastAxiosErrorSummary) {
    lines.push('--- Axios (último error) ---');
    lines.push(this.lastAxiosErrorSummary);
  }

  // Si guardás snapshots de respuestas (sin token), adjuntalos
  if (this.lastHttpDebug) {
    lines.push('--- HTTP debug (última interacción) ---');
    lines.push(this.lastHttpDebug);
  }

  const text = lines.join('\n');

  // Evita adjuntar strings vacíos
  if (text.trim().length > 0) {
    await this.attach(text, 'text/plain');
  }
});
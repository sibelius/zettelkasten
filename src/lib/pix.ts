// Static Pix "copia e cola" / QR payload (BR Code, EMV MPM), the same one x-eleicoes uses.

export const PIX = {
  key: 'c78052c6-43e5-4732-a9ef-90fd615ed638',
  name: 'Sibelius Seraphini',
  city: 'Sao Paulo',
  // Shows on my statement, so donations from this site are easy to tell apart.
  txid: 'ZETTELKASTEN',
};

const field = (id: string, value: string) => `${id}${String(value.length).padStart(2, '0')}${value}`;

// CRC16-CCITT (poly 0x1021, init 0xFFFF), as the Pix spec requires.
function crc16(value: string) {
  let crc = 0xffff;

  for (const byte of new TextEncoder().encode(value)) {
    crc ^= byte << 8;

    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

const plain = (value: string, max: number) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .slice(0, max);

export function pixPayload({
  key,
  name,
  city,
  txid,
  amount,
}: {
  key: string;
  name: string;
  city: string;
  /** Static Pix: up to 25 letters or digits. */
  txid: string;
  /** Empty: the payer types the amount in their bank app. */
  amount?: number;
}) {
  const body =
    field('00', '01') +
    field('26', field('00', 'br.gov.bcb.pix') + field('01', key)) +
    field('52', '0000') +
    field('53', '986') +
    (amount && amount > 0 ? field('54', amount.toFixed(2)) : '') +
    field('58', 'BR') +
    field('59', plain(name, 25)) +
    field('60', plain(city, 15)) +
    field('62', field('05', txid.replace(/[^A-Za-z0-9]/g, '').slice(0, 25) || '***')) +
    '6304';

  return body + crc16(body);
}

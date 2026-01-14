'use client'

export function useCommandParser() {
  const parse = (input: string) => {
    const tokens = input.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g) || [];

    const cleanTokens = tokens.map(token => token.replace(/^["']|["']$/g, ''));

    const [action, target, ...rest] = cleanTokens;

    const flags: string[] = [];
    const payloadParts: string[] = [];

    rest.forEach(token => {
      if (token.startsWith('--')) flags.push(token);
      else payloadParts.push(token);
    });

    return {
      action: action?.toLowerCase() || '',
      target: target?.toLowerCase() || '',
      flags,
      payload: payloadParts.join(' '),
    }
  }

  return { parse };
}
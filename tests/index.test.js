const fs = require('fs');
const postcss = require('postcss');

const autoprefixerTV = require('../');

const readFile = (path) => fs.readFileSync(path, 'utf-8');
const run = (input, output) =>
    postcss([ autoprefixerTV() ]).process(input, { from: undefined })
    .then((result) => {
        expect(result.css).toEqual(output);
        expect(result.warnings().length).toBe(0);
    });

describe('autoprefixer-tv', () => {
    it('splits duplicated prefixed property declarations', () => {
        const input = readFile('./tests/fixtures/prefixed-only.css');
        const output = readFile('./tests/expects/prefixed-only.css');

        return run(input, output);
    });

    it('keeps duplicated unprefixed property declarations untouched', () => {
        const input = readFile('./tests/fixtures/unprefixed-only.css');
        const output = readFile('./tests/expects/unprefixed-only.css');

        return run(input, output);
    });

    it('keeps other property declarations on the last rule', () => {
        const input = readFile('./tests/fixtures/prefixed-with-other-decl.css');
        const output = readFile('./tests/expects/prefixed-with-other-decl.css');

        return run(input, output);
    });

    it('processes correctly with multiple prefixed rules', () => {
        const input = readFile('./tests/fixtures/multiple-prefixed-properties.css');
        const output = readFile('./tests/expects/multiple-prefixed-properties.css');

        return run(input, output);
    });
});

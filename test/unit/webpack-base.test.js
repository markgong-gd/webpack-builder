const assert = require('assert');

describe('webpack.base.js test case', () => {

    const baseConfig = require('../../lib/webpack.base.js');
    it('entry', () => {
        assert.equal(baseConfig.entry.index, "F:/selfpro/test/webpack/let's_learning/my-project/builder-webpack/test/smoke/template/src/index/index.js")
        assert.equal(baseConfig.entry.search, "F:/selfpro/test/webpack/let's_learning/my-project/builder-webpack/test/smoke/template/src/search/index.js")
    })
})
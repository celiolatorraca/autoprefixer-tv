const postcss = require('postcss');

const filterOnlyPrefixedProps = (rule, props) =>
    props.filter((prop) =>
        prop.filter((propPosition) =>
            /^-\D/.test(rule.nodes[propPosition].value)
        ).length > 0
    );

const extractDuplicatedProps = (rule) => {
    const props = {};
    rule.nodes.forEach((node, index) => {
        if (!props[node.prop]) props[node.prop] = [];
        props[node.prop].push(index);
    });

    const duplicatedProps = [];
    for (let key in props) {
        if (!props.hasOwnProperty(key)) continue;

        const propPositions = props[key];
        if (propPositions.length > 1) {
            duplicatedProps.push(propPositions);
        }
    }

    return duplicatedProps;
};

module.exports = postcss.plugin('autoprefixer-tv', () =>
    (css) => {
        css.walkRules((rule) => {
            let duplicatedProps = extractDuplicatedProps(rule);
            duplicatedProps = filterOnlyPrefixedProps(rule, duplicatedProps);

            duplicatedProps.forEach((duplicatedProp) => {
                for (let i = 0; i < duplicatedProp.length - 1; i++) {
                    const newRule = postcss.rule({ selector: rule.selector });

                    const position = duplicatedProp[i];
                    const decl = rule.nodes[position];
                    newRule.append(
                        postcss.decl({ prop: decl.prop, value: decl.value })
                    );

                    rule.removeChild(decl);
                    rule.parent.insertBefore(rule, newRule);
                }
            });
        });
    }
);

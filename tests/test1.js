/* globals on, sendChat, findObjs */

on('ready', () => {

  const config = {
    bar1: 'hp',
    bar2: 'ac',
    bar3: 'speed',
    // If the attribute cannot be found on bars 1 - 3, setting this to true will link the attribute & update the value
    overwriteBadBars: true
  }

  const warnGm = `/w gm Could not set bar %%bar%% on %%name%% as it is linked to the wrong attribute.`;

  const grabTokens = (characterId) => findObjs({ type: 'graphic', represents: characterId });

  const updateBarValue = (token, { newValue, maxValue, barNumber, attributeId }) => {
    if (token && token.id && newValue != null) {
      // Early return if the token doesn't need updating (not updated through mobile)
      if (newValue === token.get(`${barNumber}_value`)) return;
      // If bars are configured according to config, set the value
      if (token.get(`${barNumber}_link`) === attributeId) token.set(`${barNumber}_value`, newValue);
      // Otherwise check all the bar links
      else {
        for (let i=1; i<=3; i++) {
          let updatedBar = false;
          // If we find the right attribute link in another bar, just update that one
          if (token.get(`bar${i}_link`) === attributeId) {
            token.set(`bar${i}_value`, newValue);
            updatedBar = true;
          }
          if (!updatedBar) {
            console.log('attribute was not found on any token bar');
            if (config.overwriteBadBars) token.set({
              [`${barNumber}_value`]: newValue,
              [`${barNumber}_link`]: attributeId,
              [`${barNumber}_max`]: maxValue
            });
            else sendChat('updateTokens', warnGm.replace('%%bar%%', barNumber.replace(/\D/g, '') ).replace('%%name%%', token.get('name') || 'token'));
          }
        }
      }
    }
  }

  on('change:attribute', (obj) => {
    if (Object.values(config).includes(obj.get('name'))) {
      const tokens = grabTokens(obj.get('characterid')),
        barNumber = Object.entries(config).find(kv => kv[1] === obj.get('name'))[0],
        attributeId = obj.get('id');
      if (tokens.length && barNumber) {
        tokens.forEach(token => updateBarValue(token, {
          newValue: obj.get('current'),
          maxValue: obj.get('max'),
          barNumber: barNumber,
          attributeId: attributeId }));
      }
    }
  });
});
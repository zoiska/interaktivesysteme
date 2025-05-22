export const state = {
  currencyCounter: 0,
  currencyPerClick: 1,
  extraCurrency: 0, // extra currency for Customisation

  isHovering: false, // is the mouse hovering over the bug
  optionsOpen: false,
  shopOpen: false,
  prestigeOpen: false,
  customisationOpen: false,
  statisticsOpen: false,

  /* boughtUpgrades object initialization
  these are always 0 ! */
  boughtUpgrades: {
    ask_on_reddit: 0,
    google_it: 0,
    tell_chatgtp_to_do_it: 0,
    read_the_documentation: 0,
    rubber_duck_debugger: 0,
    git_gud: 0,
    null_pointer_wand: 0,
    debugging_goggles: 0,
    spaghetti_code_chef: 0,
    fof_finder: 0,
    overclocked_brain: 0,
    boolean_blender: 0,
    ai_pair_programmer: 0,
    ctrlz_mastery: 0,
    dark_mode_dev: 0,
    keyboard_masher: 0,
    the_agile_anvil: 0,
    quantum_commenter: 0,
    css_sorcerer: 0,
    overengineer_supreme: 0,
    big_o_optimizer: 0,
    infinite_retry_protocol: 0,
    console_log_overload: 0,
    tech_debt_digger: 0,
  },

  statistics: {
    total_clicks: 0,
    total_currency: 0,
    total_upgrades_bought: 0,
    total_currency_spent: 0,
    // TODO: time spent ingame
  },
};

/**
 * DB/Skills/SkillUnit.js
 *
 * Zone effects
 *
 * This file is part of ROBrowser, (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */

import SU from './SkillUnitConst.js';
import EC from 'DB/Effects/EffectConst.js';

const SkillUnit = {};

SkillUnit[SU.UNT_SAFETYWALL] = EC.EF_GLASSWALL2;
SkillUnit[SU.UNT_FIREWALL] = EC.EF_FIREWALL;
SkillUnit[SU.UNT_WARPPORTAL] = EC.EF_PORTAL2;
SkillUnit[SU.UNT_PRE_WARPPORTAL] = EC.EF_READYPORTAL2;
SkillUnit[SU.UNT_SANCTUARY] = EC.EF_BOTTOM_SANC;
SkillUnit[SU.UNT_MAGNUS] = EC.EF_BOTTOM_MAG;
SkillUnit[SU.UNT_PNEUMA] = EC.EF_PNEUMA;
SkillUnit[SU.UNT_FIREPILLAR_WAITING] = EC.EF_FIREPILLARON;
SkillUnit[SU.UNT_ICEWALL] = EC.EF_ICEWALL;
SkillUnit[SU.UNT_QUAGMIRE] = EC.EF_QUAGMIRE;
SkillUnit[SU.UNT_BLASTMINE] = 'ef_trap_03_3';
SkillUnit[SU.UNT_SKIDTRAP] = 'ef_trap_02';
SkillUnit[SU.UNT_ANKLESNARE] = 'ef_trap_01';
SkillUnit[SU.UNT_VENOMDUST] = EC.EF_VENOMDUST2;
SkillUnit[SU.UNT_LANDMINE] = 'ef_trap_03';
SkillUnit[SU.UNT_SHOCKWAVE] = 'ef_trap_03_6';
SkillUnit[SU.UNT_SANDMAN] = 'ef_trap_03_4';
SkillUnit[SU.UNT_FLASHER] = 'ef_trap_03_5';
SkillUnit[SU.UNT_FREEZINGTRAP] = 'ef_trap_03_2';
SkillUnit[SU.UNT_CLAYMORETRAP] = 'ef_trap_04';
SkillUnit[SU.UNT_TALKIEBOX] = 'ef_trap_05';
SkillUnit[SU.UNT_VOLCANO] = EC.EF_BOTTOM_VO;
SkillUnit[SU.UNT_DELUGE] = EC.EF_BOTTOM_DE;
SkillUnit[SU.UNT_VIOLENTGALE] = EC.EF_BOTTOM_VI;
SkillUnit[SU.UNT_LANDPROTECTOR] = EC.EF_BOTTOM_LA;
SkillUnit[SU.UNT_LULLABY] = '278_ground'; // Tofix
SkillUnit[SU.UNT_RICHMANKIM] = '279_ground'; // Tofix
SkillUnit[SU.UNT_ETERNALCHAOS] = '280_ground'; // Tofix
SkillUnit[SU.UNT_DRUMBATTLEFIELD] = '281_ground'; // Tofix
SkillUnit[SU.UNT_RINGNIBELUNGEN] = '282_ground'; // Tofix
SkillUnit[SU.UNT_ROKISWEIL] = '283_ground'; // Tofix
SkillUnit[SU.UNT_INTOABYSS] = '284_ground'; // Tofix
SkillUnit[SU.UNT_SIEGFRIED] = '285_ground'; // Tofix
SkillUnit[SU.UNT_DISSONANCE] = '277_ground'; // Tofix
SkillUnit[SU.UNT_WHISTLE] = '286_ground'; // Tofix
SkillUnit[SU.UNT_ASSASSINCROSS] = '287_ground'; // Tofix
SkillUnit[SU.UNT_POEMBRAGI] = '288_ground'; // Tofix
SkillUnit[SU.UNT_APPLEIDUN] = '289_ground'; // Tofix
SkillUnit[SU.UNT_UGLYDANCE] = '290_ground'; // Tofix
SkillUnit[SU.UNT_HUMMING] = '291_ground'; // Tofix
SkillUnit[SU.UNT_DONTFORGETME] = '292_ground'; // Tofix
SkillUnit[SU.UNT_FORTUNEKISS] = '293_ground'; // Tofix
SkillUnit[SU.UNT_SERVICEFORYOU] = '294_ground'; // Tofix
SkillUnit[SU.UNT_GRAFFITI] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_DEMONSTRATION] = EC.EF_DEMONSTRATION;
SkillUnit[SU.UNT_GOSPEL] = '370_ground'; // Tofix
SkillUnit[SU.UNT_BASILICA] = EC.EF_BOTTOM_BASILICA;
SkillUnit[SU.UNT_MOONLIT] = '394_ground'; // Tofix
SkillUnit[SU.UNT_FOGWALL] = '405_ground'; // Tofix
SkillUnit[SU.UNT_SPIDERWEB] = EC.EF_BOTTOM_SPIDER;
SkillUnit[SU.UNT_GRAVITATION] = '522_ground'; // Tofix
SkillUnit[SU.UNT_HERMODE] = EC.EF_BOTTOM_HERMODE;
SkillUnit[SU.UNT_SUITON] = EC.EF_BOTTOM_SUITON;
SkillUnit[SU.UNT_TATAMIGAESHI] = EC.EF_TATAMI;
SkillUnit[SU.UNT_KAEN] = EC.EF_KAEN;
SkillUnit[SU.UNT_GROUNDDRIFT_WIND] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_GROUNDDRIFT_WATER] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_GROUNDDRIFT_FIRE] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_DEATHWAVE] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_WATERATTACK] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_EVILLAND] = EC.EF_BOTTOM_EVILLAND;
SkillUnit[SU.UNT_EPICLESIS] = EC.EF_GLASSWALL3;
SkillUnit[SU.UNT_EARTHSTRAIN] = EC.EF_EARTHWALL;
SkillUnit[SU.UNT_MANHOLE] = EC.EF_BOTTOM_MANHOLE;
SkillUnit[SU.UNT_DIMENSIONDOOR] = EC.EF_FORESTLIGHT6;
SkillUnit[SU.UNT_CHAOSPANIC] = EC.EF_BOTTOM_ANI;
SkillUnit[SU.UNT_MAELSTROM] = EC.EF_BOTTOM_MAELSTROM;
SkillUnit[SU.UNT_BLOODYLUST] = EC.EF_BOTTOM_BLOODYLUST;
SkillUnit[SU.UNT_FEINTBOMB] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_MAGENTATRAP] = 'ef_trap_3_magenta';
SkillUnit[SU.UNT_COBALTTRAP] = 'ef_trap_3_cobalt';
SkillUnit[SU.UNT_MAIZETRAP] = 'ef_trap_3_maze';
SkillUnit[SU.UNT_VERDURETRAP] = 'ef_trap_3_verdure';
SkillUnit[SU.UNT_FIRINGTRAP] = 'ef_trap_3_fire';
SkillUnit[SU.UNT_ICEBOUNDTRAP] = 'ef_trap_3_ice';
SkillUnit[SU.UNT_ELECTRICSHOCKER] = 'ef_trap_3_shock';
SkillUnit[SU.UNT_CLUSTERBOMB] = 'ef_trap_3_cluster';
SkillUnit[SU.UNT_REVERBERATION] = EC.EF_BOT_REVERB;
SkillUnit[SU.UNT_SEVERE_RAINSTORM] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_FIREWALK] = EC.EF_FIREWALL2;
SkillUnit[SU.UNT_ELECTRICWALK] = EC.EF_SHOCKWAVE2;
SkillUnit[SU.UNT_NETHERWORLD] = EC.EF_BOT_REVERB2;
SkillUnit[SU.UNT_PSYCHIC_WAVE] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_CLOUD_KILL] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_POISONSMOKE] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_NEUTRALBARRIER] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_STEALTHFIELD] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_WARMER] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_THORNS_TRAP] = 'ef_trap_3_thorn';
SkillUnit[SU.UNT_WALLOFTHORN] = EC.EF_WALLOFTHORN;
SkillUnit[SU.UNT_DEMONIC_FIRE] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_FIRE_EXPANSION_SMOKE_POWDER] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_FIRE_EXPANSION_TEAR_GAS] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_HELLS_PLANT] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_VACUUM_EXTREME] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_BANDING] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_FIRE_MANTLE] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_WATER_BARRIER] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_ZEPHYR] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_POWER_OF_GAIA] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_FIRE_INSIGNIA] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_WATER_INSIGNIA] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_WIND_INSIGNIA] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_EARTH_INSIGNIA] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_POISON_MIST] = 959; // Original persistent Poison Mist STR; removed with the server unit.
SkillUnit[SU.UNT_LAVA_SLIDE] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_VOLCANIC_ASH] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_ZENKAI_WATER] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_MAKIBISHI] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_VENOMFOG] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_ICEMINE] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_MAGMA_ERUPTION] = EC.EF_NONE; // Todo
SkillUnit[SU.UNT_B_TRAP] = EC.EF_NONE; // Todo

// Original single-center ground effects use the existing server-unit lifecycle.
SkillUnit[SU.UNT_ABYSS_SQUARE] = 'original_all_abc_abyss_square_ground';
SkillUnit[SU.UNT_ALL_BLOOM] = 'original_all_ag_all_bloom_ground';
SkillUnit[SU.UNT_ASTRAL_STRIKE] = 'original_all_ag_astral_strike_ground';
SkillUnit[SU.UNT_MYSTERY_ILLUSION] = 'original_all_ag_mystery_illusion_ground';
SkillUnit[SU.UNT_STRANTUM_TREMOR] = 'original_all_ag_strantum_tremor_ground';
SkillUnit[SU.UNT_TORNADO_STORM] = 'original_all_ag_tornado_storm_ground';
SkillUnit[SU.UNT_PNEUMATICUS_PROCELLA] = 'original_all_cd_pneumaticus_procella_ground';
SkillUnit[SU.UNT_CONFLAGRATION] = 'original_all_em_conflagration_ground';
SkillUnit[SU.UNT_LIGHTNING_LAND] = 'original_all_em_lightning_land_ground';
SkillUnit[SU.UNT_NYANGGRASS] = 'original_all_su_nyanggrass_ground';
SkillUnit[SU.UNT_DEEPBLINDTRAP] = 'original_all_wh_deepblindtrap_ground';
SkillUnit[SU.UNT_FLAMETRAP] = 'original_all_wh_flametrap_ground';
SkillUnit[SU.UNT_SOLIDTRAP] = 'original_all_wh_solidtrap_ground';
SkillUnit[SU.UNT_SWIFTTRAP] = 'original_all_wh_swifttrap_ground';

// Original resources: casting events and server-owned ground lifecycles.
SkillUnit[SU.UNT_RAIN_OF_CRYSTAL] = 'original_completion_ag_rain_of_crystal_ground';
SkillUnit[SU.UNT_VIOLENT_QUAKE] = 'original_completion_ag_violent_quake_ground';
SkillUnit[SU.UNT_VENOM_SWAMP] = 'original_completion_em_venom_swamp_ground';
SkillUnit[SU.UNT_ACIDIFIED_ZONE_FIRE] = 'original_completion_bo_acidified_zone_fire_ground';
SkillUnit[SU.UNT_ACIDIFIED_ZONE_WATER] = 'original_completion_bo_acidified_zone_water_ground';
SkillUnit[SU.UNT_ACIDIFIED_ZONE_GROUND] = 'original_completion_bo_acidified_zone_ground_ground';
SkillUnit[SU.UNT_ACIDIFIED_ZONE_WIND] = 'original_completion_bo_acidified_zone_wind_ground';
SkillUnit[SU.UNT_B_TRAP] = 'original_completion_audio_rl_b_trap';
SkillUnit[SU.UNT_FIRE_RAIN] = 'original_completion_audio_rl_fire_rain';
SkillUnit[SU.UNT_HYUN_ROKS_BREEZE] = 'original_completion_audio_sh_hyun_roks_breeze';
SkillUnit[SU.UNT_MISSION_BOMBARD] = 'original_completion_audio_nw_mission_bombard';
SkillUnit[SU.UNT_JACK_FROST_NOVA] = 'original_completion_audio_hn_jack_frost_nova';
SkillUnit[SU.UNT_GROUND_GRAVITATION] = 'original_completion_audio_hn_ground_gravitation';
SkillUnit[SU.UNT_STAR_BURST] = 'original_completion_audio_ske_star_burst';
SkillUnit[SU.UNT_STAR_CANNON] = 'original_completion_audio_ske_star_cannon';
SkillUnit[SU.UNT_FUUMASHOUAKU] = 'original_completion_audio_ss_fuumashouaku';
SkillUnit[SU.UNT_KUNAIWAIKYOKU] = 'original_completion_audio_ss_kunaiwaikyoku';
SkillUnit[SU.UNT_TOTEM_OF_TUTELARY] = 'kro_phase_soa_totem_of_tutelary_unit';
SkillUnit[SU.UNT_GRENADES_DROPPING] = 'kro_phase_nw_grenades_dropping_unit';
SkillUnit[SU.UNT_MISSION_BOMBARD] = 'kro_phase_nw_mission_bombard_unit';
SkillUnit[SU.UNT_TWINKLING_GALAXY] = 'kro_phase_ske_twinkling_galaxy_unit';

SkillUnit[SU.UNT_KUNAIKAITEN] = 'fidelity_ss_kunaikaiten_unit';
SkillUnit[SU.UNT_FUUMASHOUAKU] = 'fidelity_ss_fuumashouaku_unit';
SkillUnit[299] = 'complete_refraction';
SkillUnit[290] = 'complete_grasp_unit';
SkillUnit[286] = 'complete_galaxy_unit';

SkillUnit[SU.UNT_FLORAL_FLARE_ROAD] = 'five_floral_unit';
SkillUnit[SU.UNT_POISONSMOKE] = 'five_poison_unit';
SkillUnit[177] = 'four_am_demonstration_unit';
SkillUnit[231] = 'four_gn_demonic_fire_unit';
SkillUnit[204] = 'four_sc_manhole_unit';
SkillUnit[205] = 'four_sc_dimensiondoor_unit';
SkillUnit[206] = 'four_sc_chaospanic_unit';
SkillUnit[207] = 'four_sc_maelstrom_unit';
SkillUnit[208] = 'four_sc_bloodylust_unit';
SkillUnit[275] = 'four_ig_cross_rain_unit';
SkillUnit[222] = 'next_poem_unit';
export default SkillUnit;

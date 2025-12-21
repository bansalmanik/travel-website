-- Generated migration SQL

-- Insert programs
INSERT OR IGNORE INTO programs (name, type, logo_url) VALUES ('Axis', 'credit_card_issuer', '/Logo/axis_logo.webp');
INSERT OR IGNORE INTO programs (name, type, logo_url) VALUES ('HDFC', 'credit_card_issuer', '/Logo/hdfc_logo.webp');
INSERT OR IGNORE INTO programs (name, type, logo_url) VALUES ('HSBC', 'credit_card_issuer', '/Logo/hsbc_logo.webp');
INSERT OR IGNORE INTO programs (name, type, logo_url) VALUES ('American Express', 'credit_card_issuer', '/Logo/american express_logo.webp');
INSERT OR IGNORE INTO programs (name, type, logo_url) VALUES ('SBI', 'credit_card_issuer', '/Logo/sbi_logo.webp');
INSERT OR IGNORE INTO programs (name, type, logo_url) VALUES ('Accor', 'credit_card_issuer', '/Logo/accor_logo.webp');
INSERT OR IGNORE INTO programs (name, type, logo_url) VALUES ('Marriott Bonvoy', 'credit_card_issuer', '/Logo/marriott bonvoy_logo.webp');
INSERT OR IGNORE INTO programs (name, type, logo_url) VALUES ('IHG One Rewards', 'credit_card_issuer', '/Logo/ihg one rewards_logo.webp');

-- Insert point sources
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Axis Burgundy Private Card', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Accor Live Limitless', 'hotel_points', '/Logo/accor_live_limitless_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air Asia', 'airline_miles', '/Logo/air_asia_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Aeroplan', 'airline_miles', '/Logo/aeroplan_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Flying Blue', 'airline_miles', '/Logo/flying_blue_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air India', 'airline_miles', '/Logo/air_india_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Ethiopian Airlines', 'airline_miles', '/Logo/ethiopian_airlines_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Etihad Guest', 'airline_miles', '/Logo/etihad_guest_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'IHG One Rewards', 'hotel_points', '/Logo/ihg_one_rewards_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'ITC', 'hotel_points', '/Logo/itc_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'JAL Mileage Bank', 'airline_miles', '/Logo/jal_mileage_bank_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Marriott Bonvoy', 'hotel_points', '/Logo/marriott_bonvoy_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Qantas Frequent Flyer', 'airline_miles', '/Logo/qantas_frequent_flyer_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Qatar Airways', 'airline_miles', '/Logo/qatar_airways_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Singapore Airlines', 'airline_miles', '/Logo/singapore_airlines_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'SpiceJet', 'airline_miles', '/Logo/spicejet_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Royal Orchid Plus', 'airline_miles', '/Logo/royal_orchid_plus_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Turkish Airlines', 'airline_miles', '/Logo/turkish_airlines_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'United MileagePlus', 'airline_miles', '/Logo/united_mileageplus_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Wyndham Rewards', 'hotel_points', '/Logo/wyndham_rewards_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Axis Magnus (Burgundy) Card', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Axis Magnus(plain) Card', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Axis Reserve Card', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Axis Horizon  Card', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'IndianOil Axis Premium  Card', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Axis Olympus  Card', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Axis Atlas  Card', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Axis Select, Privilege & Rewards  Cards', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'airasia', 'airline_miles', '/Logo/airasia_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Axis Other Eligible /Debit Cards', 'credit_card', '' FROM programs WHERE name = 'Axis';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'HDFC Regalia Gold Cards', 'credit_card', '' FROM programs WHERE name = 'HDFC';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'AirAsia Rewards', 'airline_miles', '/Logo/airasia_rewards_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Finnair Plus (Avios)', 'airline_miles', '/Logo/finnair_plus_(avios)_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Hainan Airlines Fortune Wings Club', 'airline_miles', '/Logo/hainan_airlines_fortune_wings_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Vietnam Airlines Lotusmiles', 'airline_miles', '/Logo/vietnam_airlines_lotusmiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Turkish Airlines Miles&Smiles', 'airline_miles', '/Logo/turkish_airlines_miles&smiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Avianca LifeMiles', 'airline_miles', '/Logo/avianca_lifemiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'British Airways Executive Club (Avios)', 'airline_miles', '/Logo/british_airways_executive_club_(avios)_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air Canada Aeroplan', 'airline_miles', '/Logo/air_canada_aeroplan_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Marriot', 'airline_miles', '/Logo/marriot_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air India Maharaja Points', 'airline_miles', '/Logo/air_india_maharaja_points_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'HDFC Infinia', 'credit_card', '' FROM programs WHERE name = 'HDFC';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'SpiceJet SpiceClub', 'airline_miles', '/Logo/spicejet_spiceclub_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Singapore Airlines KrisFlyer', 'airline_miles', '/Logo/singapore_airlines_krisflyer_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Qatar Avios', 'airline_miles', '/Logo/qatar_avios_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Club ITC Green Points', 'hotel_points', '/Logo/club_itc_green_points_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'HDFC Diners Club Black', 'credit_card', '' FROM programs WHERE name = 'HDFC';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'HSBC Travel One', 'credit_card', '' FROM programs WHERE name = 'HSBC';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air France–KLM Flying Blue', 'airline_miles', '/Logo/air_france–klm_flying_blue_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'British Airways Executive Club', 'airline_miles', '/Logo/british_airways_executive_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'EVA Air Infinity MileageLands', 'airline_miles', '/Logo/eva_air_infinity_mileagelands_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Japan Airlines Mileage Bank', 'airline_miles', '/Logo/japan_airlines_mileage_bank_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Qatar Airways Privilege Club', 'airline_miles', '/Logo/qatar_airways_privilege_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Thai Airways Royal Orchid Plus', 'airline_miles', '/Logo/thai_airways_royal_orchid_plus_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Shangri-La Circle', 'airline_miles', '/Logo/shangri-la_circle_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'HSBC Prive', 'credit_card', '' FROM programs WHERE name = 'HSBC';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'HSBC Premier', 'credit_card', '' FROM programs WHERE name = 'HSBC';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'HSBC Visa Platinum', 'credit_card', '' FROM programs WHERE name = 'HSBC';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'HSBC Rupay Platinum', 'credit_card', '' FROM programs WHERE name = 'HSBC';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Membership Reward Points', 'credit_card', '' FROM programs WHERE name = 'American Express';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Asia Miles', 'airline_miles', '/Logo/asia_miles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Emirates Skywards', 'airline_miles', '/Logo/emirates_skywards_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Virgin Atlantic Flying Club', 'airline_miles', '/Logo/virgin_atlantic_flying_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Hilton Honors', 'airline_miles', '/Logo/hilton_honors_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'SBI Miles Cards', 'credit_card', '' FROM programs WHERE name = 'SBI';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Cathay', 'airline_miles', '/Logo/cathay_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air Arabia AA Rewards', 'airline_miles', '/Logo/air_arabia_aa_rewards_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Ethiopian Airlines ShebaMiles', 'airline_miles', '/Logo/ethiopian_airlines_shebamiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Saudia Alfursan', 'airline_miles', '/Logo/saudia_alfursan_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'SBI Aurum Card', 'credit_card', '' FROM programs WHERE name = 'SBI';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Accor Live Limitless', 'credit_card', '' FROM programs WHERE name = 'Accor';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Aegean Miles+Bonus', 'airline_miles', '/Logo/aegean_miles+bonus_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'ITA Airways (Volare)', 'airline_miles', '/Logo/ita_airways_(volare)_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Juneyao Air', 'airline_miles', '/Logo/juneyao_air_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'LATAM Pass (Brazil)', 'airline_miles', '/Logo/latam_pass_(brazil)_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Smiles Miles', 'airline_miles', '/Logo/smiles_miles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Vietnam Airlines LotusMiles', 'airline_miles', '/Logo/vietnam_airlines_lotusmiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Marriott Bonvoy Points', 'credit_card', '' FROM programs WHERE name = 'Marriott Bonvoy';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'AEGEAN Miles+Bonus', 'airline_miles', '/Logo/aegean_miles+bonus_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Aer Lingus AerClub', 'airline_miles', '/Logo/aer_lingus_aerclub_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Aeromexico Rewards', 'airline_miles', '/Logo/aeromexico_rewards_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air China PhoenixMiles', 'airline_miles', '/Logo/air_china_phoenixmiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air France-KLM Flying Blue', 'airline_miles', '/Logo/air_france-klm_flying_blue_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Atmos™ Rewards', 'airline_miles', '/Logo/atmos™_rewards_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'American Airlines AAdvantage®', 'airline_miles', '/Logo/american_airlines_aadvantage®_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'ANA Mileage Club', 'airline_miles', '/Logo/ana_mileage_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'The British Airways Club', 'airline_miles', '/Logo/the_british_airways_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Cathay Pacific Cathay', 'airline_miles', '/Logo/cathay_pacific_cathay_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'China Southern Airlines Sky Pearl Club', 'airline_miles', '/Logo/china_southern_airlines_sky_pearl_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Copa Airlines ConnectMiles', 'airline_miles', '/Logo/copa_airlines_connectmiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Delta SkyMiles®', 'airline_miles', '/Logo/delta_skymiles®_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Emirates Skywards®', 'airline_miles', '/Logo/emirates_skywards®_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'FRONTIER Miles', 'airline_miles', '/Logo/frontier_miles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Iberia Plus', 'airline_miles', '/Logo/iberia_plus_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'InterMiles', 'airline_miles', '/Logo/intermiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Japan Airlines JAL Mileage Bank', 'airline_miles', '/Logo/japan_airlines_jal_mileage_bank_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'LATAM Airlines LATAM Pass', 'airline_miles', '/Logo/latam_airlines_latam_pass_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'LATAM Pass Brazil', 'airline_miles', '/Logo/latam_pass_brazil_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Singapore Airlines KrisFlyer®', 'airline_miles', '/Logo/singapore_airlines_krisflyer®_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Southwest Rapid Rewards®', 'airline_miles', '/Logo/southwest_rapid_rewards®_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'TAP Air Portugal Miles&Go', 'airline_miles', '/Logo/tap_air_portugal_miles&go_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'United MileagePlus®', 'airline_miles', '/Logo/united_mileageplus®_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Virgin Australia Velocity Frequent Flyer', 'airline_miles', '/Logo/virgin_australia_velocity_frequent_flyer_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Vueling Club', 'airline_miles', '/Logo/vueling_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air New Zealand Airpoints', 'airline_miles', '/Logo/air_new_zealand_airpoints_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            SELECT id, 'Points', 'credit_card', '' FROM programs WHERE name = 'IHG One Rewards';
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Aeromexico – Club Premier', 'airline_miles', '/Logo/aeromexico_–_club_premier_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air Canada – Aeroplan', 'airline_miles', '/Logo/air_canada_–_aeroplan_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air China – PhoenixMiles', 'airline_miles', '/Logo/air_china_–_phoenixmiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air France KLM – Flying Blue', 'airline_miles', '/Logo/air_france_klm_–_flying_blue_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air New Zealand – Airpoints', 'airline_miles', '/Logo/air_new_zealand_–_airpoints_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Air Portugal – TAP Miles&Go', 'airline_miles', '/Logo/air_portugal_–_tap_miles&go_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Alaska Airlines – Mileage Plan', 'airline_miles', '/Logo/alaska_airlines_–_mileage_plan_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'ANA – ANA Mileage Club', 'airline_miles', '/Logo/ana_–_ana_mileage_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'American Airlines – AAdvantage', 'airline_miles', '/Logo/american_airlines_–_aadvantage_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Asia Miles (Cathay Pacific)', 'airline_miles', '/Logo/asia_miles_(cathay_pacific)_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Avianca Airlines – LifeMiles', 'airline_miles', '/Logo/avianca_airlines_–_lifemiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'British Airways – Executive Club', 'airline_miles', '/Logo/british_airways_–_executive_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'China Eastern – Eastern Miles', 'airline_miles', '/Logo/china_eastern_–_eastern_miles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'China Southern – Sky Pearl Club', 'airline_miles', '/Logo/china_southern_–_sky_pearl_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Delta Air Lines – SkyMiles®', 'airline_miles', '/Logo/delta_air_lines_–_skymiles®_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Emirates – Skywards', 'airline_miles', '/Logo/emirates_–_skywards_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Etihad Airways – Etihad Guest', 'airline_miles', '/Logo/etihad_airways_–_etihad_guest_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Eva Airways – Infinity MileageLands', 'airline_miles', '/Logo/eva_airways_–_infinity_mileagelands_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Finnair – Finnair Plus', 'airline_miles', '/Logo/finnair_–_finnair_plus_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Gulf Air – Falconflyer', 'airline_miles', '/Logo/gulf_air_–_falconflyer_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Hainan Airlines – Fortune Wings Club', 'airline_miles', '/Logo/hainan_airlines_–_fortune_wings_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Iberia Airlines – Iberia Plus', 'airline_miles', '/Logo/iberia_airlines_–_iberia_plus_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Japan Airlines – JAL Mileage Bank', 'airline_miles', '/Logo/japan_airlines_–_jal_mileage_bank_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'JetBlue – TrueBlue', 'airline_miles', '/Logo/jetblue_–_trueblue_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Korean Air – SKYPASS', 'airline_miles', '/Logo/korean_air_–_skypass_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Lufthansa – Miles & More', 'airline_miles', '/Logo/lufthansa_–_miles_&_more_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Malaysia Airlines – Enrich', 'airline_miles', '/Logo/malaysia_airlines_–_enrich_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'MilleMiglia (ITA Airways / Alitalia)', 'airline_miles', '/Logo/millemiglia_(ita_airways_/_alitalia)_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Qantas Airlines – Frequent Flyer', 'airline_miles', '/Logo/qantas_airlines_–_frequent_flyer_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Singapore Airlines – KrisFlyer', 'airline_miles', '/Logo/singapore_airlines_–_krisflyer_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'South African Airways – Voyager', 'airline_miles', '/Logo/south_african_airways_–_voyager_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Thai Airways – Royal Orchid Plus', 'airline_miles', '/Logo/thai_airways_–_royal_orchid_plus_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Turkish Airlines – Miles&Smiles', 'airline_miles', '/Logo/turkish_airlines_–_miles&smiles_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'United Airlines – MileagePlus®', 'airline_miles', '/Logo/united_airlines_–_mileageplus®_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Virgin Atlantic – Flying Club', 'airline_miles', '/Logo/virgin_atlantic_–_flying_club_logo.webp');
INSERT OR IGNORE INTO point_sources (program_id, name, type, logo_url) 
            VALUES (NULL, 'Virgin Australia – Velocity Frequent Flyer', 'airline_miles', '/Logo/virgin_australia_–_velocity_frequent_flyer_logo.webp');

-- Insert conversion rates
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Asia' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group B partner with annual capping of 12,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group B partner with annual capping of 12,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group B partner with annual capping of 12,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group B partner with annual capping of 12,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group B partner with annual capping of 12,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group B partner with annual capping of 12,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group B partner with annual capping of 12,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Burgundy Private Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '5 : 4 Ratio',
            'This is Group A partner with annual capping of 3,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Asia' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group B partner with annual capping of 8,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group B partner with annual capping of 8,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group B partner with annual capping of 8,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group B partner with annual capping of 8,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group B partner with annual capping of 8,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group B partner with annual capping of 8,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group B partner with annual capping of 8,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus (Burgundy) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '5 EDGE Points : 4 Partner Points',
            'This is Group A partner with annual capping of 2,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Asia' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Magnus(plain) Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Asia' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Reserve Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '5 EDGE Points : 2 Partner Points',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Asia' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Horizon  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '1 EDGE Mile : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Asia' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'IndianOil Axis Premium  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '2 EDGE Miles : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Asia' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group B partner with annual capping of 6,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group B partner with annual capping of 6,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group B partner with annual capping of 6,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group B partner with annual capping of 6,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group B partner with annual capping of 6,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group B partner with annual capping of 6,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group B partner with annual capping of 6,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Olympus  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '1 EDGE Mile : 4 Partner Points',
            'This is Group A partner with annual capping of 1,50,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Asia' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group B partner with annual capping of 1,20,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group B partner with annual capping of 1,20,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group B partner with annual capping of 1,20,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group B partner with annual capping of 1,20,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group B partner with annual capping of 1,20,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group B partner with annual capping of 1,20,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group B partner with annual capping of 1,20,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '1 EDGE Mile : 2 Partner Points',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Atlas  Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '2 EDGE Miles : 1 Marriott Bonvoy Point',
            'This is Group A partner with annual capping of 30,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '5 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '5 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'airasia' LIMIT 1),
            '5 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Select, Privilege & Rewards  Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'airasia' LIMIT 1),
            '10 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeroplan' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group B partner with annual capping of 4,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Axis Other Eligible /Debit Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '20 EDGE Points : 1 Partner Point',
            'This is Group A partner with annual capping of 1,00,000.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            '1 RP = 0.5 mile conversion.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Finnair Plus (Avios)' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            '1 RP = 0.5 Finnair Plus Avios.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            '1 RP = 0.5 mile conversion.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines Fortune Wings Club' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            '1 RP = 0.5 mile conversion.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vietnam Airlines Lotusmiles' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            '1 RP = 0.5 mile conversion.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            '1 RP = 0.5 mile conversion.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Avianca LifeMiles' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            '1 RP = 0.5 mile conversion.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            '1 RP = 0.5 mile conversion.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club (Avios)' LIMIT 1),
            '1 Point : 0.33 Partner Point',
            'Lower value conversion at 1 RP = 0.33 Avios.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Canada Aeroplan' LIMIT 1),
            '1 Point : 0.33 Partner Point',
            'Lower value conversion at 1 RP = 0.33 point.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '1 Point : 0.33 Partner Point',
            'Lower value conversion at 1 RP = 0.33 mile.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriot' LIMIT 1),
            '1 Point : 0.33 Partner Point',
            'Lower value conversion at 1 RP = 0.33 mile.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India Maharaja Points' LIMIT 1),
            '3 Points : 1 Partner Point',
            'Least favorable conversion at 3 RP = 1 mile.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            'Standard hotel transfer at 1 RP = 0.5 point.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            'Standard hotel transfer at 1 RP = 0.5 point.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            'Standard hotel transfer at 1 RP = 0.5 point.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Regalia Gold Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITC' LIMIT 1),
            '1 Point : 0.5 Partner Point',
            'Standard hotel transfer at 1 RP = 0.5 point.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Finnair Plus (Avios)' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines Fortune Wings Club' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vietnam Airlines Lotusmiles' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet SpiceClub' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Redeemed via Net Banking at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club (Avios)' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Canada Aeroplan' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Avianca LifeMiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India Maharaja Points' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Avios' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Should never be done. Instead transfer 1:1 to Finnair Avios',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '1 Point : 1 Partner Point (Hotels)',
            'Optimal 1:1 hotel transfer.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '1 Point : 1 Partner Point (Hotels)',
            'Optimal 1:1 hotel transfer.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '2 Points : 1 Partner Point (Hotels)',
            'Devalued 2:1 hotel transfer.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Infinia' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Club ITC Green Points' LIMIT 1),
            '2 Points : 1 Partner Point (Hotels)',
            'Devalued 2:1 hotel transfer.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Finnair Plus (Avios)' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines Fortune Wings Club' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vietnam Airlines Lotusmiles' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet SpiceClub' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Optimal 1:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Redeemed via Net Banking at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club (Avios)' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Canada Aeroplan' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Avianca LifeMiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India Maharaja Points' LIMIT 1),
            '2 Points : 1 Partner Point',
            '2:1 transfer ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Avios' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Should never be done. Instead transfer 1:1 to Finnair Avios',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '1 Point : 1 Partner Point (Hotels)',
            'Optimal 1:1 hotel transfer.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '1 Point : 1 Partner Point (Hotels)',
            'Optimal 1:1 hotel transfer.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '2 Points : 1 Partner Point (Hotels)',
            'Devalued 2:1 hotel transfer.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HDFC Diners Club Black' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Club ITC Green Points' LIMIT 1),
            '2 Points : 1 Partner Point (Hotels)',
            'Devalued 2:1 hotel transfer.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air France–KLM Flying Blue' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'EVA Air Infinity MileageLands' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Japan Airlines Mileage Bank' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways Privilege Club' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Thai Airways Royal Orchid Plus' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vietnam Airlines Lotusmiles' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '1 Point : 3 Partner Points',
            'Transfer at 1:3.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines Fortune Wings Club' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Travel One' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Shangri-La Circle' LIMIT 1),
            '5 Points : 1 Partner Point',
            'Transfer at 5:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air France–KLM Flying Blue' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'EVA Air Infinity MileageLands' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Japan Airlines Mileage Bank' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways Privilege Club' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Thai Airways Royal Orchid Plus' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vietnam Airlines Lotusmiles' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '1 Point : 3 Partner Points',
            'Transfer at 1:3.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines Fortune Wings Club' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Prive' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Shangri-La Circle' LIMIT 1),
            '5 Points : 1 Partner Point',
            'Transfer at 5:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air France–KLM Flying Blue' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'EVA Air Infinity MileageLands' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Japan Airlines Mileage Bank' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways Privilege Club' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Thai Airways Royal Orchid Plus' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vietnam Airlines Lotusmiles' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '1 Point : 3 Partner Points',
            'Transfer at 1:3.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines Fortune Wings Club' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Premier' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Shangri-La Circle' LIMIT 1),
            '5 Points : 1 Partner Point',
            'Transfer at 5:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air France–KLM Flying Blue' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'EVA Air Infinity MileageLands' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Japan Airlines Mileage Bank' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways Privilege Club' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Thai Airways Royal Orchid Plus' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vietnam Airlines Lotusmiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '1 Point : 2 Partner Points',
            'Transfer at 1:2.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines Fortune Wings Club' LIMIT 1),
            '4 Points : 1 Partner Point',
            'Transfer at 4:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '4 Points : 1 Partner Point',
            'Transfer at 4:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '3 Points : 1 Partner Point',
            'Transfer at 3:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Visa Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Shangri-La Circle' LIMIT 1),
            '10 Points : 1 Partner Point',
            'Transfer at 10:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air France–KLM Flying Blue' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'EVA Air Infinity MileageLands' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Japan Airlines Mileage Bank' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways Privilege Club' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Thai Airways Royal Orchid Plus' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vietnam Airlines Lotusmiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'IHG One Rewards' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Wyndham Rewards' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfer at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '1 Point : 2 Partner Points',
            'Transfer at 1:2.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines Fortune Wings Club' LIMIT 1),
            '4 Points : 1 Partner Point',
            'Transfer at 4:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '4 Points : 1 Partner Point',
            'Transfer at 4:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '3 Points : 1 Partner Point',
            'Transfer at 3:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'HSBC Rupay Platinum' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Shangri-La Circle' LIMIT 1),
            '10 Points : 1 Partner Point',
            'Transfer at 10:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Membership Reward Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Asia Miles' LIMIT 1),
            '2 MR Points : 1 Partner Point',
            'Transfers from American Express Membership Rewards convert at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Membership Reward Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club' LIMIT 1),
            '2 MR Points : 1 Partner Point',
            'Transfers from American Express Membership Rewards convert at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Membership Reward Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Emirates Skywards' LIMIT 1),
            '2 MR Points : 1 Partner Point',
            'Transfers from American Express Membership Rewards convert at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Membership Reward Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '2 MR Points : 1 Partner Point',
            'Transfers from American Express Membership Rewards convert at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Membership Reward Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways Privilege Club' LIMIT 1),
            '2 MR Points : 1 Partner Point',
            'Transfers from American Express Membership Rewards convert at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Membership Reward Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Virgin Atlantic Flying Club' LIMIT 1),
            '2 MR Points : 1 Partner Point',
            'Transfers from American Express Membership Rewards convert at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Membership Reward Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer' LIMIT 1),
            '2 MR Points : 1 Partner Point',
            'Transfers from American Express Membership Rewards convert at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Membership Reward Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hilton Honors' LIMIT 1),
            '1 MR Point : 0.9 Hilton Honors Points',
            'Hilton Honors transfers convert from American Express Membership Rewards at 1:0.9.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Membership Reward Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy' LIMIT 1),
            '1 MR Point : 1 Marriott Bonvoy Point',
            'Marriott Bonvoy transfers convert from American Express Membership Rewards at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Canada Aeroplan' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to Aeroplan at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to AirAsia Rewards at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Flying Blue' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to Flying Blue at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to Maharaja Club at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways Executive Club' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to British Airways Executive Club at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Cathay' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to Cathay at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to Etihad Guest at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'SpiceJet SpiceClub' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to SpiceClub at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Royal Orchid Plus' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to Royal Orchid Plus at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '1 Point : 1 Partner Point',
            'Transfers from SBI Miles convert to Qantas Frequent Flyer at 1:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Arabia AA Rewards' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfers from SBI Miles convert to AA Rewards at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Emirates Skywards' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfers from SBI Miles convert to Emirates Skywards at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Ethiopian Airlines ShebaMiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfers from SBI Miles convert to ShebaMiles at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JAL Mileage Bank' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfers from SBI Miles convert to JAL Mileage Bank at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Saudia Alfursan' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfers from SBI Miles convert to Alfursan at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfers from SBI Miles convert to Miles&Smiles at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfers from SBI Miles convert to MileagePlus at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Miles Cards' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways Privilege Club' LIMIT 1),
            '2 Points : 1 Partner Point',
            'Transfers from SBI Miles convert to Privilege Club at 2:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Aurum Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AirAsia Rewards' LIMIT 1),
            '4 Points : 1 Partner Point',
            'Transfers from SBI Aurum convert to AirAsia Rewards at 4:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Aurum Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air India' LIMIT 1),
            '5 Points : 1 Partner Point',
            'Transfers from SBI Aurum convert to Maharaja Club at 5:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'SBI Aurum Card' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways Privilege Club' LIMIT 1),
            '5 Points : 1 Partner Point',
            'Transfers from SBI Aurum convert to Privilege Club at 5:1.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aegean Miles+Bonus' LIMIT 1),
            '2000 ALL Points : 1000 Miles',
            'Transfer 2,000 ALL Points into 1000 Miles',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Emirates Skywards' LIMIT 1),
            '4,000 ALL Points : 2,000 Miles',
            'Transfer 4,000 ALL Points into 2000 Miles.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Finnair Plus (Avios)' LIMIT 1),
            '2,000 ALL Points : 1300 Avios',
            'Transfer 2,000 ALL Points into 1300 Avios.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ITA Airways (Volare)' LIMIT 1),
            '4,000 ALL Points : 5,000 Volare Points',
            'Redeem 4,000 ALL points for 5,000 Volare points (4:5 ratio) via Accor to airline transfer.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Japan Airlines Mileage Bank' LIMIT 1),
            '4,000 ALL Points : 2,000 Miles',
            'Transfer 4,000 ALL Points into 2000 Miles.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Juneyao Air' LIMIT 1),
            '2000 ALL Points : 150 Juneyao Points',
            'Convert 2000 All points into 150',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'LATAM Pass (Brazil)' LIMIT 1),
            '4,000 ALL Points : 2,000 Miles',
            'Transfer 4,000 ALL Points into 2000 Miles.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer' LIMIT 1),
            '2,000 ALL Points : 1,000 Miles',
            'Transfer 2,000 ALL Points into 1000 Miles.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Smiles Miles' LIMIT 1),
            '4,000 ALL Points : 2,000 Miles',
            'Transfer 4,000 ALL Points into 2000 Miles.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Accor Live Limitless' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vietnam Airlines LotusMiles' LIMIT 1),
            '3,000 Rewaard Points : 2,000 LotusMiles',
            'Transfer 3,000 ALL Points into 2000 Miles.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'AEGEAN Miles+Bonus' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to AEGEAN Miles+Bonus miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aer Lingus AerClub' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Aer Lingus AerClub Avios at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeromexico Rewards' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Aeromexico Rewards kilometers at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Canada Aeroplan' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Air Canada Aeroplan points at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air China PhoenixMiles' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Air China PhoenixMiles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air France-KLM Flying Blue' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Flying Blue miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Atmos™ Rewards' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Atmos Rewards miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'American Airlines AAdvantage®' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to American Airlines AAdvantage miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ANA Mileage Club' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to ANA Mileage Club miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Avianca LifeMiles' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Avianca LifeMiles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'The British Airways Club' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to The British Airways Club Avios at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Cathay Pacific Cathay' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Cathay Pacific Cathay miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'China Southern Airlines Sky Pearl Club' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to China Southern Airlines Sky Pearl Club kilometers at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Copa Airlines ConnectMiles' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Copa Airlines ConnectMiles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Delta SkyMiles®' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Delta SkyMiles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Emirates Skywards®' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Emirates Skywards miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Guest' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Etihad Guest miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'FRONTIER Miles' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to FRONTIER Miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines Fortune Wings Club' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Hainan Airlines Fortune Wings Club miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Iberia Plus' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Iberia Plus Avios at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'InterMiles' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to InterMiles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Japan Airlines JAL Mileage Bank' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Japan Airlines JAL Mileage Bank miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'LATAM Airlines LATAM Pass' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to LATAM Pass kilometers at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'LATAM Pass Brazil' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to LATAM Pass Brazil points at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Frequent Flyer' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Qantas Frequent Flyer points at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qatar Airways Privilege Club' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Qatar Airways Privilege Club Avios at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Saudia Alfursan' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Saudia Alfursan miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines KrisFlyer®' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Singapore Airlines KrisFlyer miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Southwest Rapid Rewards®' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Southwest Rapid Rewards points at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'TAP Air Portugal Miles&Go' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to TAP Air Portugal Miles&Go miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Thai Airways Royal Orchid Plus' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Thai Airways Royal Orchid Plus miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines Miles&Smiles' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Turkish Airlines Miles&Smiles miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United MileagePlus®' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to United MileagePlus miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Virgin Atlantic Flying Club' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Virgin Atlantic Flying Club miles at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Virgin Australia Velocity Frequent Flyer' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Virgin Australia Velocity Frequent Flyer points at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Vueling Club' LIMIT 1),
            '3 Marriott Points : 1 Airline Mile',
            'Convert Marriott Bonvoy points to Vueling Club Avios at a 3:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Marriott Bonvoy Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air New Zealand Airpoints' LIMIT 1),
            '200 Marriott Points : 1 Airpoints Dollar',
            'Convert Marriott Bonvoy points to Air New Zealand Airpoints at a 200:1 ratio.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Aeromexico – Club Premier' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Aeromexico Club Premier at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Canada – Aeroplan' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Air Canada Aeroplan at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air China – PhoenixMiles' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Air China PhoenixMiles at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air France KLM – Flying Blue' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Flying Blue at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air New Zealand – Airpoints' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Air New Zealand Airpoints at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Air Portugal – TAP Miles&Go' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to TAP Miles&Go at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Alaska Airlines – Mileage Plan' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Alaska Airlines Mileage Plan at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'ANA – ANA Mileage Club' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to ANA Mileage Club at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'American Airlines – AAdvantage' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to American Airlines AAdvantage at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Asia Miles (Cathay Pacific)' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Cathay Pacific Asia Miles at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Avianca Airlines – LifeMiles' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Avianca LifeMiles at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'British Airways – Executive Club' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to British Airways Executive Club at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'China Eastern – Eastern Miles' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to China Eastern Eastern Miles at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'China Southern – Sky Pearl Club' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to China Southern Sky Pearl Club at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Delta Air Lines – SkyMiles®' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Delta SkyMiles at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Emirates – Skywards' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Emirates Skywards at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Etihad Airways – Etihad Guest' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Etihad Guest at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Eva Airways – Infinity MileageLands' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to EVA Air Infinity MileageLands at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Finnair – Finnair Plus' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Finnair Plus at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Gulf Air – Falconflyer' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Gulf Air Falconflyer at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Hainan Airlines – Fortune Wings Club' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Hainan Airlines Fortune Wings Club at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Iberia Airlines – Iberia Plus' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Iberia Plus at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'InterMiles' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to InterMiles at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Japan Airlines – JAL Mileage Bank' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Japan Airlines JAL Mileage Bank at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'JetBlue – TrueBlue' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to JetBlue TrueBlue at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Korean Air – SKYPASS' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Korean Air SKYPASS at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Lufthansa – Miles & More' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Lufthansa Miles & More at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Malaysia Airlines – Enrich' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Malaysia Airlines Enrich at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'MilleMiglia (ITA Airways / Alitalia)' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to ITA Airways MilleMiglia at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Qantas Airlines – Frequent Flyer' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Qantas Frequent Flyer at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Singapore Airlines – KrisFlyer' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Singapore Airlines KrisFlyer at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'South African Airways – Voyager' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to South African Airways Voyager at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Thai Airways – Royal Orchid Plus' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Thai Airways Royal Orchid Plus at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Turkish Airlines – Miles&Smiles' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Turkish Airlines Miles&Smiles at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'United Airlines – MileagePlus®' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to United MileagePlus at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Virgin Atlantic – Flying Club' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Virgin Atlantic Flying Club at a 5:1 ratio with a 10,000-point minimum.',
            1;
INSERT OR IGNORE INTO conversion_rates (from_source_id, to_source_id, rate, insight, enabled)
          SELECT 
            (SELECT id FROM point_sources WHERE name = 'Points' LIMIT 1),
            (SELECT id FROM point_sources WHERE name = 'Virgin Australia – Velocity Frequent Flyer' LIMIT 1),
            '5 Points : 1 Partner Point (10,000 point minimum)',
            'Transfer IHG One Rewards points to Virgin Australia Velocity Frequent Flyer at a 5:1 ratio with a 10,000-point minimum.',
            1;

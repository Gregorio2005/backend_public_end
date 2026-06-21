-- Script to drop versioning triggers and functions
-- These triggers conflict with the Node.js backend versioning logic (versioning.js)

-- Drop the triggers first (they reference the functions)
DROP TRIGGER IF EXISTS a_tr_obs_bags ON public.inputs_bags;
DROP TRIGGER IF EXISTS a_tr_obs_cameras ON public.inputs_cameras;
DROP TRIGGER IF EXISTS a_tr_obs_cardboard ON public.inputs_cardboard;
DROP TRIGGER IF EXISTS a_tr_obs_cases ON public.inputs_cases;
DROP TRIGGER IF EXISTS a_tr_obs_chemicals ON public.inputs_chemicals;
DROP TRIGGER IF EXISTS a_tr_obs_collars ON public.inputs_collars;
DROP TRIGGER IF EXISTS a_tr_obs_oring ON public.inputs_oring;
DROP TRIGGER IF EXISTS a_tr_obs_stamps ON public.inputs_stamps;
DROP TRIGGER IF EXISTS a_tr_obs_stuffing ON public.inputs_stuffing_stamps_downspouts;
DROP TRIGGER IF EXISTS a_tr_obs_thermoplastics ON public.inputs_thermoplastics;

DROP TRIGGER IF EXISTS tr_sync_master_bags ON public.inputs_bags;
DROP TRIGGER IF EXISTS tr_sync_master_cameras ON public.inputs_cameras;
DROP TRIGGER IF EXISTS tr_sync_master_cardboard ON public.inputs_cardboard;
DROP TRIGGER IF EXISTS tr_sync_master_cases ON public.inputs_cases;
DROP TRIGGER IF EXISTS tr_sync_master_chemicals ON public.inputs_chemicals;
DROP TRIGGER IF EXISTS tr_sync_master_collars ON public.inputs_collars;
DROP TRIGGER IF EXISTS tr_sync_master_oring ON public.inputs_oring;
DROP TRIGGER IF EXISTS tr_sync_master_stamps ON public.inputs_stamps;
DROP TRIGGER IF EXISTS tr_sync_master_stuffing ON public.inputs_stuffing_stamps_downspouts;
DROP TRIGGER IF EXISTS tr_sync_master_thermoplastics ON public.inputs_thermoplastics;

-- Drop the functions
DROP FUNCTION IF EXISTS public.fn_obsolete_old_reference();
DROP FUNCTION IF EXISTS public.fn_sync_to_master(integer);

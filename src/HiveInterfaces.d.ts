export as namespace HiveInterfaces

export interface HiveAuthorization {
	username: string
	password: string
	secret: string
	remember: boolean
}

export type HashrateAlgo = 'ethash' | string
export type CoinName = 'ETH' | 'ETC' | string

export namespace Message {
    export interface Worker {
        id: number;
        farm_id: number;
        name: string;
    }

    export interface Data {
        id: number;
        type: string;
        time: number;
        title: string;
        has_payload: boolean;
        worker: Worker;
    }

    export interface Pagination {
        total: number;
        count: number;
        per_page: number;
        current_page: number;
        total_pages: number;
    }
}

export interface Messages {
	data: Data[];
	pagination: Pagination;
}

export namespace Worker {
    export interface RemoteAddress {
        ip: string;
    }

    export interface LanConfig {
        dns: string;
        dhcp: boolean;
        address: string;
        gateway: string;
    }

    export interface Versions {
        hive: string;
        kernel: string;
        amd_driver: string;
        nvidia_driver: string;
    }

    export interface Stats {
        online: boolean;
        boot_time: number;
        stats_time: number;
    }

    export interface Motherboard {
        manufacturer: string;
        model: string;
        bios: string;
    }

    export interface Cpu {
        id: string;
        model: string;
        cores: number;
        aes: boolean;
    }

    export interface Disk {
        model: string;
    }

    export interface NetInterface {
        mac: string;
        iface: string;
    }

    export interface HardwareInfo {
        motherboard: Motherboard;
        cpu: Cpu;
        disk: Disk;
        net_interfaces: NetInterface[];
    }

    export interface Options {
        shellinabox_enable: boolean;
        ssh_enable: boolean;
        ssh_password_enable: boolean;
        vnc_enable: boolean;
    }

    export interface MessagesCounts {
        success: number;
        danger: number;
        warning: number;
        info: number;
        default: number;
        file: number;
    }

    export interface Item {
        coin: string;
        pool: string;
        wal_id: number;
        miner: string;
    }

    export interface FlightSheet {
        id: number;
        farm_id: number;
        name: string;
        items: Item[];
    }

    export interface Gpu {
        name: string;
        amount: number;
    }

    export interface GpuSummary {
        gpus: Gpu[];
        max_temp: number;
        max_fan: number;
    }

    export interface Details {
        subvendor: string;
        mem: string;
        mem_gb?: number;
        mem_type: string;
        mem_oem: string;
        vbios: string;
        oem: string;
    }

    export interface PowerLimit {
        min: string;
        def: string;
        max: string;
    }

    export interface GpuInfo {
        bus_id: string;
        bus_number: number;
        brand: string;
        model: string;
        details: Details;
        index?: number;
        short_name: string;
        power_limit: PowerLimit;
    }

    export interface Message {
        id: number;
        type: string;
        time: number;
        title: string;
        has_payload: boolean;
    }

    export interface Data {
        id: number;
        farm_id: number;
        platform: number;
        name: string;
        active: boolean;
        tag_ids: any[];
        password: string;
        mirror_url: string;
        ip_addresses: string[];
        remote_address?: RemoteAddress;
        vpn: boolean;
        system_type: string;
        needs_upgrade: boolean;
        lan_config: LanConfig;
        migrated: boolean;
        versions: Versions;
        stats: Stats;
        hardware_info: HardwareInfo;
        options: Options;
        commands: any[];
        messages_counts: MessagesCounts;
        units_count: number;
        red_temp: number;
        red_fan: number;
        red_asr: number;
        red_la: number;
        red_cpu_temp: number;
        red_mem_temp: number;
        has_amd: boolean;
        has_nvidia: boolean;
        flight_sheet: FlightSheet;
        gpu_summary: GpuSummary;
        gpu_info: GpuInfo[];
        messages: Message[];
    }

}

export interface WorkersResponse {
	data: Worker.Data[];
	tags: Worker.Tag[];
}

export namespace Farm {
	export interface Owner {
		id: number;
		login: string;
		name: string;
		me: boolean;
	}

	export interface CostDetail {
		type: number;
		type_name: string;
		amount: number;
		monthly_price: number;
		monthly_cost: number;
		daily_cost: number;
	}

	export interface Money {
		is_paid: boolean;
		is_free: boolean;
		paid_cause: string;
		balance: number;
		discount: number;
		daily_cost: number;
		monthly_cost: number;
		days_left: number;
		overdraft: boolean;
		cost_details: CostDetail[];
		daily_price: number;
		monthly_price: number;
		daily_use_rigs: number;
		daily_use_asics: number;
		price_per_rig: number;
		price_per_asic: number;
		overdraft_days_left?: number;
	}

	export interface Stats {
		workers_total: number;
		workers_online: number;
		workers_offline: number;
		workers_overheated: number;
		workers_no_temp: number;
		workers_overloaded: number;
		workers_invalid: number;
		workers_low_asr: number;
		workers_no_hashrate: number;
		workers_with_problem: number;
		rigs_total: number;
		rigs_online: number;
		rigs_offline: number;
		rigs_power: number;
		gpus_total: number;
		gpus_online: number;
		gpus_offline: number;
		gpus_overheated: number;
		gpus_no_temp: number;
		asics_total: number;
		asics_online: number;
		asics_offline: number;
		asics_power: number;
		boards_total: number;
		boards_online: number;
		boards_offline: number;
		boards_overheated: number;
		boards_no_temp: number;
		cpus_online: number;
		devices_total: number;
		devices_online: number;
		devices_offline: number;
		power_draw: number;
		asr: number;
		power_cost?: number;
	}

	export interface Hashrate {
		algo: HashrateAlgo;
		hashrate: number;
	}

	export interface HashratesByCoin {
		coin: CoinName;
		algo: HashrateAlgo;
		hashrate: number;
	}

	export interface PersonalSettings {
		is_favorite: boolean;
	}

	export interface DefaultFs {
		1: number;
	}

	export interface Data {
		id: number;
		name: string;
		timezone: string;
		nonfree: boolean;
		twofa_required: boolean;
		trusted: boolean;
		gpu_red_temp: number;
		asic_red_temp: number;
		gpu_red_fan: number;
		asic_red_fan: number;
		gpu_red_asr: number;
		asic_red_asr: number;
		gpu_red_la: number;
		asic_red_la: number;
		gpu_red_cpu_temp: number;
		gpu_red_mem_temp: number;
		asic_red_board_temp: number;
		autocreate_hash: string;
		locked: boolean;
		tag_ids: number[];
		auto_tags: boolean;
		workers_count: number;
		rigs_count: number;
		asics_count: number;
		disabled_rigs_count: number;
		disabled_asics_count: number;
		owner: Owner;
		money: Money;
		stats: Stats;
		hashrates: Hashrate[];
		hashrates_by_coin: HashratesByCoin[];
		personal_settings: PersonalSettings;
		charge_on_pool: boolean;
		role: string;
		power_price?: number;
		power_price_currency: string;
		psu_efficiency?: number;
		default_fs: DefaultFs;
	}

	export interface Tag {
		id: number;
		type_id: number;
		user_id: number;
		name: string;
		color: number;
		is_auto: boolean;
		farms_count: number;
	}
}

export interface FarmsResponse {
	data: Farm.Data[];
	tags: Farm.Tag[];
}

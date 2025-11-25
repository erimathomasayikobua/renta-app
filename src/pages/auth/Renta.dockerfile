{
	"Id": "",
	"Created": "",
	"Path": "",
	"Args": [
		"nginx",
		"-g",
		"daemon off;"
	],
	"State": {
		"Status": "running",
		"Running": true,
		"Paused": false,
		"Restarting": false,
		"OOMKilled": false,
		"Dead": false,
		"Pid": 593,
		"ExitCode": 0,
		"Error": "",
		"StartedAt": "2025-11-20T09:35:44.7370887Z",
		"FinishedAt": "2025-11-20T09:34:02.9176153Z"
	},
	"Image": "sha256:c4d56c24da4f009ecf8352146b43497fe78953edb4c679b841732beb97e588b0",
	"ResolvConfPath": "/var/lib/docker/containers/d2c96c12ad54c713fd1902534d01506d76598b28cb4112e36a9b59047de13978/resolv.conf",
	"HostnamePath": "/var/lib/docker/containers/d2c96c12ad54c713fd1902534d01506d76598b28cb4112e36a9b59047de13978/hostname",
	"HostsPath": "/var/lib/docker/containers/d2c96c12ad54c713fd1902534d01506d76598b28cb4112e36a9b59047de13978/hosts",
	"LogPath": "/var/lib/docker/containers/d2c96c12ad54c713fd1902534d01506d76598b28cb4112e36a9b59047de13978/d2c96c12ad54c713fd1902534d01506d76598b28cb4112e36a9b59047de13978-json.log",
	"Name": "/welcome-to-docker",
	"RestartCount": 0,
	"Driver": "overlayfs",
	"Platform": "linux",
	"MountLabel": "",
	"ProcessLabel": "",
	"AppArmorProfile": "",
	"ExecIDs": null,
	"HostConfig": {
		"Binds": null,
		"ContainerIDFile": "",
		"LogConfig": {
			"Type": "json-file",
			"Config": {}
		},
		"NetworkMode": "bridge",
		"PortBindings": {
			"80/tcp": [
				{
					"HostIp": "",
					"HostPort": "8088"
				}
			]
		},
		"RestartPolicy": {
			"Name": "no",
			"MaximumRetryCount": 0
		},
		"AutoRemove": false,
		"VolumeDriver": "",
		"VolumesFrom": null,
		"ConsoleSize": [
			0,
			0
		],
		"CapAdd": null,
		"CapDrop": null,
		"CgroupnsMode": "private",
		"Dns": [],
		"DnsOptions": [],
		"DnsSearch": [],
		"ExtraHosts": null,
		"GroupAdd": null,
		"IpcMode": "private",
		"Cgroup": "",
		"Links": null,
		"OomScoreAdj": 0,
		"PidMode": "",
		"Privileged": false,
		"PublishAllPorts": false,
		"ReadonlyRootfs": false,
		"SecurityOpt": null,
		"UTSMode": "",
		"UsernsMode": "",
		"ShmSize": 67108864,
		"Runtime": "runc",
		"Isolation": "",
		"CpuShares": 0,
		"Memory": 0,
		"NanoCpus": 0,
		"CgroupParent": "",
		"BlkioWeight": 0,
		"BlkioWeightDevice": null,
		"BlkioDeviceReadBps": null,
		"BlkioDeviceWriteBps": null,
		"BlkioDeviceReadIOps": null,
		"BlkioDeviceWriteIOps": null,
		"CpuPeriod": 0,
		"CpuQuota": 0,
		"CpuRealtimePeriod": 0,
		"CpuRealtimeRuntime": 0,
		"CpusetCpus": "",
		"CpusetMems": "",
		"Devices": null,
		"DeviceCgroupRules": null,
		"DeviceRequests": null,
		"MemoryReservation": 0,
		"MemorySwap": 0,
		"MemorySwappiness": null,
		"OomKillDisable": null,
		"PidsLimit": null,
		"Ulimits": null,
		"CpuCount": 0,
		"CpuPercent": 0,
		"IOMaximumIOps": 0,
		"IOMaximumBandwidth": 0,
		"MaskedPaths": [
			"/proc/asound",
			"/proc/acpi",
			"/proc/interrupts",
			"/proc/kcore",
			"/proc/keys",
			"/proc/latency_stats",
			"/proc/timer_list",
			"/proc/timer_stats",
			"/proc/sched_debug",
			"/proc/scsi",
			"/sys/firmware",
			"/sys/devices/virtual/powercap"
		],
		"ReadonlyPaths": [
			"/proc/bus",
			"/proc/fs",
			"/proc/irq",
			"/proc/sys",
			"/proc/sysrq-trigger"
		]
	},
	"GraphDriver": {
		"Data": null,
		"Name": "overlayfs"
	},
	"Mounts": [],
	"Config": {
		"Hostname": "d2c96c12ad54",
		"Domainname": "",
		"User": "",
		"AttachStdin": false,
		"AttachStdout": false,
		"AttachStderr": false,
		"ExposedPorts": {
			"80/tcp": {}
		},
		"Tty": false,
		"OpenStdin": false,
		"StdinOnce": false,
		"Env": [
			"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
			"NGINX_VERSION=1.29.0",
			"PKG_RELEASE=1",
			"DYNPKG_RELEASE=1"
		],
		"Cmd": [
			"nginx",
			"-g",
			"daemon off;"
		],
		"Image": "docker/welcome-to-docker:latest",
		"Volumes": null,
		"WorkingDir": "/",
		"Entrypoint": [
			"/docker-entrypoint.sh"
		],
		"OnBuild": null,
		"Labels": {
			"maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
		},
		"StopSignal": "SIGQUIT"
	},
	"NetworkSettings": {
		"Bridge": "",
		"SandboxID": "3c0c3b69a5e8fdeaaa8211b878be78c882c6772cdcc45bb5c50dc48276609e16",
		"SandboxKey": "/var/run/docker/netns/3c0c3b69a5e8",
		"Ports": {
			"80/tcp": [
				{
					"HostIp": "0.0.0.0",
					"HostPort": "8088"
				},
				{
					"HostIp": "::",
					"HostPort": "8088"
				}
			]
		},
		"HairpinMode": false,
		"LinkLocalIPv6Address": "",
		"LinkLocalIPv6PrefixLen": 0,
		"SecondaryIPAddresses": null,
		"SecondaryIPv6Addresses": null,
		"EndpointID": "75fa335e0d1d8cc47789e375ff5ed5c2b60cc164bc5b253933e298b784c4e482",
		"Gateway": "172.17.0.1",
		"GlobalIPv6Address": "",
		"GlobalIPv6PrefixLen": 0,
		"IPAddress": "172.17.0.2",
		"IPPrefixLen": 16,
		"IPv6Gateway": "",
		"MacAddress": "1e:d5:a9:72:23:e9",
		"Networks": {
			"bridge": {
				"IPAMConfig": null,
				"Links": null,
				"Aliases": null,
				"MacAddress": "1e:d5:a9:72:23:e9",
				"DriverOpts": null,
				"GwPriority": 0,
				"NetworkID": "c6e0e7698087fcc82b533ab8097fb211c7aef747c40588af1ad055abf1b1cc79",
				"EndpointID": "75fa335e0d1d8cc47789e375ff5ed5c2b60cc164bc5b253933e298b784c4e482",
				"Gateway": "172.17.0.1",
				"IPAddress": "172.17.0.2",
				"IPPrefixLen": 16,
				"IPv6Gateway": "",
				"GlobalIPv6Address": "",
				"GlobalIPv6PrefixLen": 0,
				"DNSNames": null
			}
		}
	},
	"ImageManifestDescriptor": {
		"mediaType": "application/vnd.oci.image.manifest.v1+json",
		"digest": "sha256:364b67503f6506ec24472c4977d83280247a8abfe6e68b44df07cc643bff540c",
		"size": 1806,
		"platform": {
			"architecture": "amd64",
			"os": "linux"
		}
	}
}
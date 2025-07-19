// src/components/SwitchTheme.tsx
'use client';

import { Laptop, Moon, Sun } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { Button } from '@/src/components/ui/button-radix';
import { useTheme } from 'next-themes';

export function SwitchTheme() {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="ghost" size="sm" className="w-10 h-10">
				<div className="w-5 h-5 bg-muted animate-pulse rounded" />
			</Button>
		);
	}

	const getThemeLabel = () => {
		switch (theme) {
			case 'light':
				return 'Claro';
			case 'dark':
				return 'Escuro';
			case 'system':
			default:
				return 'Sistema';
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="gap-2 hover:bg-accent/10 transition-all duration-200"
					title={`Tema atual: ${getThemeLabel()}`}
				>
					{resolvedTheme === 'light' ? (
						<Sun size={20} className="text-yellow-500" />
					) : resolvedTheme === 'dark' ? (
						<Moon size={20} className="text-blue-400" />
					) : (
						<Laptop size={20} className="text-gray-400" />
					)}
					<span className="hidden sm:inline-block text-sm font-medium">{getThemeLabel()}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40 p-2" align="end" sideOffset={8}>
				<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
					<DropdownMenuRadioItem
						value="light"
						className="flex items-center gap-3 py-2 px-3 cursor-pointer hover:bg-accent/50 rounded-md transition-colors"
					>
						<Sun size={18} className="text-yellow-500" />
						<span className="font-medium">Claro</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						value="dark"
						className="flex items-center gap-3 py-2 px-3 cursor-pointer hover:bg-accent/50 rounded-md transition-colors"
					>
						<Moon size={18} className="text-blue-400" />
						<span className="font-medium">Escuro</span>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						value="system"
						className="flex items-center gap-3 py-2 px-3 cursor-pointer hover:bg-accent/50 rounded-md transition-colors"
					>
						<Laptop size={18} className="text-gray-400" />
						<span className="font-medium">Sistema</span>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default SwitchTheme;
